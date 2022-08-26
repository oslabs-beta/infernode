import { Request, Response, NextFunction } from 'express';
import captureDB, { Capture } from '../models/captureModel';
import { UpdateBody, DbCInterface, CbThis } from '../interfaces/dbcontroller.interface';
import { InfernodeError } from '../utils/globalErrorHandler';

// TODO: refactor createRecord and add updateRecord (separate request)

// class DBController {
//   private nextID: number;

//   // Keeping track of the ID in the class so to avoid having to query the database for the next id.
//   constructor() {
//     this.nextID = 0;
//   }

//   public getID = (req: Request, res: Response, next: NextFunction) => {
//     res.locals.id = this.nextID;
//     return next();
//   };

//   // IMPORTANT: Currently does not assign/change res.locals.id
//   public incrementID = (req: Request, res: Response, next: NextFunction) => {
//     this.nextID += 1;
//     return next();
//   };

//   public createEmptyRecord = (req: Request, res: Response, next: NextFunction) => {
//     const date = new Date();
//     captureDB.run(
//       'INSERT INTO capture (capture_name, date, creator, app_name, data) VALUES (?, ?, ?, ?, ?)',
//       'unspecified',
//       date.toString(),
//       'unspecified',
//       'unspecified',
//       'unspecified',
//       (err: Error) => {
//         if (err) {
//           console.log(err);
//           return next(new InfernodeError(
//             'Unable to create empty record',
//             'An error occurred when trying to create an empty record',
//             500,
//             'DBController',
//           ));
//         }
//         res.locals.id = this.nextID;
//         this.nextID += 1;
//         return next();
//       },
//     );
//   };

//   // Adds a new row to the DB with given info.
//   public updateRecord = (req: Request, res: Response, next: NextFunction) => {
//     // Type Guard for req.body
//     function isDbBody(body: DbBody | object | undefined): body is DbBody {
//       // Helper function to check if req.body has all the required properties.
//       function hasProperties(obj: object, arr: string[]): boolean {
//         let hasAll = true;
//         for (let i = 0; i < arr.length; i += 1) {
//           if (!(arr[i] in obj)) {
//             hasAll = false;
//             break;
//           }
//         }

//         return hasAll;
//       }

//       // Checking if passed in information is an object.
//       if (typeof body === 'object') {
//         const properties: string[] = ['captureName', 'creator', 'appName', 'data'];
//         return hasProperties(req.body as typeof Object, properties);
//       }
//       // If passed in info is not an object, return false.
//       return false;
//     }

//     try {
//       if (isDbBody(req.body as DbBody)) {
//         const {
//           captureName, creator, appName, data,
//         }: DbBody = req.body as DbBody;
//         let insertSQL = 'INSERT INTO capture (id, capture_name, creator, app_name, data)';
//         insertSQL += ' VALUES (?, ?, ?, ?, ?)';
//         // Running the SQL query for insert. Passing in the query and all variables it requires.
//         captureDB.all(
//           insertSQL,
//           this.nextID,
//           captureName,
//           creator,
//           appName,
//           data,
//           (err: Error) => {
//             if (err) {
//             // console.table(err);
//             // console.log(err);
//               return next(new InfernodeError(
//                 'Unable to insert capture into DB',
//                 'An error occurred when trying to insert the capture into the DB',
//                 500,
//                 'DBController',
//               ));
//             }
//             // Sending ID in res.locals for next controller method to use.
//             res.locals.id = this.nextID;
//             this.nextID += 1;
//             return next();
//           },
//         );
//       } else {
//         throw new Error('req.body is formatted incorrectly');
//       }
//     } catch (err) {
//       // console.log(err);
//       next(new InfernodeError(
//         'An error occured.',
//         'An error occurred. It could be an issue with the request body',
//         500,
//         'DBController',
//       ));
//     }
//   };
// }

function isNumber(id: number | unknown): id is number {
  if (typeof id === 'number') return true;
  return false;
}

// type CaptureOrNull = Capture | null;

async function selectRow(id: number): Promise<Capture> {
  // let result: null | Capture;
  let selectSQL = 'SELECT * FROM capture WHERE id = ';
  selectSQL += id;
  return new Promise((resolve, reject) => {
    captureDB.all(
      selectSQL,
      (err: Error, rows: object[]): void => {
        if (err) {
          // console.log(`dbController.selectRow error: ${JSON.stringify(err)}`);
          reject(new Error(`dbController.selectRow error: ${JSON.stringify(err)}`));
        }
        if (rows.length === 1) {
          resolve(rows[0] as Capture);
        } else {
          reject(new Error(`dbController.selectRow unexpected number of rows: ${rows.length}`));
        }
      },
    );
  });
}
// function selectRow(id: string, res: Response, next: NextFunction) {
//   let selectSQL = 'SELECT * FROM capture WHERE id = ';
//   selectSQL += id;
//   captureDB.run(
//     selectSQL,
//     (err: Error, rows: object[]): void | null => {
//       if (err) {
//         return next(new InfernodeError(
//           'Unable to select row',
//           'An error occured when select row based off of ID',
//           500,
//           'DBController',
//         ));
//       }
//       [res.locals.rowFromID] = [rows];
//       return next();
//     },
//   );
// }

const dbController: DbCInterface = {
  getAllRows(req: Request, res: Response, next: NextFunction): void {
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
  },

  createEmptyRecord(req: Request, res: Response, next: NextFunction): void {
    const date = new Date();
    captureDB.run(
      'INSERT INTO capture (capture_name, date, creator, app_name, data) VALUES (?, ?, ?, ?, ?)',
      'unspecified',
      date.toString(),
      'unspecified',
      'unspecified',
      'unspecified',
      function callback(this: unknown, err: Error) {
        function isCbThis(thisObj: object | unknown): thisObj is CbThis {
          if (thisObj === null) return false;
          if (typeof thisObj === 'object' && 'lastID' in thisObj) return true;
          return false;
        }
        // console.log('CHECK CREATEEMPTYRECORD THIS', this, err);
        if (err) {
          // console.log(err);
          return next(new InfernodeError(
            'Unable to create empty record',
            'An error occurred when trying to create an empty record',
            500,
            'DBController',
          ));
        }
        if (isCbThis(this) && isNumber(this.lastID)) {
          res.locals.id = this.lastID;
          return next();
        }
        return next(new InfernodeError(
          'There was an issue with the returned ID',
          'Received an invalid ID',
          500,
          'DBController',
        ));
      },
    );
  },

  updateRecord(req: Request, res: Response, next: NextFunction): void {
    // function isUpdateBody(updateBody: object | undefined): updateBody is UpdateBody {
    //   if (typeof updateBody === 'object' && 'id' in updateBody) return true;
    //   return false;
    //   // return (updateBody as UpdateBody).id !== undefined;
    // }
    // handle none of these being passed in
    const reqBody: object | undefined = req.body as object | undefined;
    // const isReqBodyFormatted = (isUpdateBody(reqBody) && isNumber(reqBody.id));
    const isReqParamsFormatted = req.params.id !== undefined;
    // console.log(req.params.id);

    // if (req.method === 'PATCH') {
    // }

    if (!reqBody || (/* isReqBodyFormatted ||  */!isReqParamsFormatted)) {
      return next(new InfernodeError(
        'The request body was not formatted correctly',
        'There was an error in updateRecord',
        500,
        'DBController',
      ));
    }
    res.locals.id = Number(req.params.id);
    // if (res.locals.id === undefined) res.locals.id = Number(reqBody.id);
    const keys = Object.keys(reqBody);
    const vals: string[] = Object.values(reqBody) as [];
    let setInfo = '';
    keys.forEach((el, i) => {
      if (el !== 'id') {
        setInfo += `${el} = "${vals[i]}", `;
      }
    });
    setInfo = setInfo.slice(0, -2);
    const updateSQL = `UPDATE capture SET ${setInfo} WHERE id = ${res.locals.id as number}`;
    captureDB.run(updateSQL, (err) => {
      if (err) {
        return next(new InfernodeError(
          'Unable to update given capture info in database',
          'There was an error when updating capture info in database',
          500,
          'DBController',
        ));
      }
      const id = Number(req.params.id);
      selectRow(id)
        .then((row) => {
          res.locals.rowFromID = row;
          return next();
        })
        .catch((error) => next({
          message: JSON.stringify(error),
        }));
    });
    // const fields: string[] = ['capture_name', 'creator', 'app_name', 'data'];
    // UPDATE demo SET Name = "0", Hint = "h" WHERE ID = 1;
    // fields.forEach((field) => {
    //   // if current field is in reqbody then updateSQL += field
    // });
  },

  deleteRecord(req: Request, res: Response, next: NextFunction): void {
    // selectRow(req.params.id, res, next);
    const id = Number(req.params.id);
    selectRow(id)
      .then((row) => {
        res.locals.rowFromID = row;
      })
      .catch((error) => next({
        message: JSON.stringify(error),
      }));
    let deleteSQL = 'DELETE FROM capture WHERE id = ';
    deleteSQL += req.params.id;
    captureDB.run(
      deleteSQL,
      (err) => {
        if (err) {
          return next(new InfernodeError(
            'Unable to delete capture based off of ID',
            'There was an error when deleting capture info in database',
            500,
            'DBController',
          ));
        }
        return next();
      },
    );
  },
};

export default dbController;
