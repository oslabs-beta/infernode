import { Request, Response, NextFunction } from 'express';
import captureDB from '../models/captureModel';
import DbBody from '../interfaces/dbcontroller.interface';
import { InfernodeError } from '../utils/globalErrorHandler';

export default class DBController {
  nextID: number;

  constructor() {
    this.nextID = 0;
  }

  // Adds a new row to the DB with given info.
  public createRecord = (req: Request, res: Response, next: NextFunction) => {
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
        const properties: string[] = ['captureName', 'date', 'creator', 'appName', 'data'];
        return hasProperties(req.body as typeof Object, properties);
      }
      // If passed in info is not an object, return false.
      return false;
    }

    try {
      console.log(req.body);
      if (isDbBody(req.body as DbBody)) {
        const {
          captureName, date, creator, appName, data,
        }: DbBody = req.body as DbBody;
        let insertSQL = 'INSERT INTO capture (id, capture_name, date, creator, app_name, data)';
        insertSQL += ' VALUES (?, ?, ?, ?, ?, ?)';
        // Running the SQL query for insert. Passing in the query and all variables it requires.
        captureDB.all(
          insertSQL,
          this.nextID,
          captureName,
          date,
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
