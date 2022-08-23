import { Request, Response, NextFunction } from 'express';
import captureDB from '../models/captureModel';
import DbBody from '../interfaces/dbcontroller.interface';
import { InfernodeError } from '../utils/globalErrorHandler';

// TODO: refactor createRecord and add updateRecord (separate request)

class DBController {
  private nextID: number;

  // Keeping track of the ID in the class so to avoid having to query the database for the next id.
  constructor() {
    this.nextID = 0;
  }

  public getID = (req: Request, res: Response, next: NextFunction) => {
    res.locals.id = this.nextID;
    return next();
  };

  // IMPORTANT: Currently does not assign/change res.locals.id
  public incrementID = (req: Request, res: Response, next: NextFunction) => {
    this.nextID += 1;
    return next();
  };

  public createEmptyRecord = (req: Request, res: Response, next: NextFunction) => {
    const date = new Date();
    captureDB.run(
      'INSERT INTO capture (id, capture_name, date, creator, app_name, data) VALUES (?, ?, ?, ?, ?, ?)',
      this.nextID,
      'unspecified',
      date.toString(),
      'unspecified',
      'unspecified',
      'unspecified',
      (err: Error) => {
        if (err) {
          return next(new InfernodeError(
            'Unable to create empty record',
            'An error occurred when trying to create an empty record',
            500,
            'DBController',
          ));
        }
        res.locals.id = this.nextID;
        this.nextID += 1;
        return next();
      },
    );
  };

  // Adds a new row to the DB with given info.
  public updateRecord = (req: Request, res: Response, next: NextFunction) => {
    // Type Guard for req.body
    function isDbBody(body: DbBody | object | undefined): body is DbBody {
      // Helper function to check if req.body has all the required properties.
      function hasProperties(obj: object, arr: string[]): boolean {
        let hasAll = true;
        for (let i = 0; i < arr.length; i += 1) {
          if (!(arr[i] in obj)) {
            hasAll = false;
            break;
          }
        }

        return hasAll;
      }

      // Checking if passed in information is an object.
      if (typeof body === 'object') {
        const properties: string[] = ['captureName', 'creator', 'appName', 'data'];
        return hasProperties(req.body as typeof Object, properties);
      }
      // If passed in info is not an object, return false.
      return false;
    }

    try {
      if (isDbBody(req.body as DbBody)) {
        const {
          captureName, creator, appName, data,
        }: DbBody = req.body as DbBody;
        let insertSQL = 'INSERT INTO capture (id, capture_name, creator, app_name, data)';
        insertSQL += ' VALUES (?, ?, ?, ?, ?)';
        // Running the SQL query for insert. Passing in the query and all variables it requires.
        captureDB.all(
          insertSQL,
          this.nextID,
          captureName,
          creator,
          appName,
          data,
          (err: Error) => {
            if (err) {
            // console.table(err);
            // console.log(err);
              return next(new InfernodeError(
                'Unable to insert capture into DB',
                'An error occurred when trying to insert the capture into the DB',
                500,
                'DBController',
              ));
            }
            // Sending ID in res.locals for next controller method to use.
            res.locals.id = this.nextID;
            this.nextID += 1;
            return next();
          },
        );
      } else {
        throw new Error('req.body is formatted incorrectly');
      }
    } catch (err) {
      // console.log(err);
      next(new InfernodeError(
        'An error occured.',
        'An error occurred. It could be an issue with the request body',
        500,
        'DBController',
      ));
    }
  };
}

// Might run into issues asynchronously adding to res.locals and trying to access it in
// another controller
function getAllRows(req: Request, res: Response, next: NextFunction) {
  captureDB.all(
    'SELECT * FROM capture',
    (err, rows: []) => {
      if (err) {
        // console.table(err);
        // console.log(err);
        return next(new InfernodeError(
          'Unable to retrieve row information',
          'An error occurred when trying to retrieve row info',
          500,
          'DBController',
        ));
      }
      res.locals.rows = rows;
      return next();
    },
  );
}

const dbControllerInstance = new DBController();
export { dbControllerInstance, getAllRows };
