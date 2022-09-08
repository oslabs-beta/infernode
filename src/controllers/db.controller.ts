import { Request, Response, NextFunction } from 'express';
import captureDB, { Capture } from '../models/captureModel';
import { DbCInterface, CbThis } from '../interfaces/dbcontroller.interface';
import { InfernodeError } from '../utils/globalErrorHandler';
import logger from '../utils/logging';

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
          logger.error(`dbController.selectRow error: ${JSON.stringify(err)}`);
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

const dbController: DbCInterface = {
  getAllRows(req: Request, res: Response, next: NextFunction): void {
    captureDB.all(
      'SELECT * FROM capture',
      (err, rows: []) => {
        if (err) {
          logger.error(err);
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
    const type = Object.values(req.params)[0];
    captureDB.run(
      'INSERT INTO capture (capture_name, date, creator, app_name, data) VALUES (?, ?, ?, ?, ?)',
      'unspecified',
      date.toString(),
      'unspecified',
      'unspecified',
      /* 'unspecified', */
      type,
      function callback(this: unknown, err: Error) {
        function isCbThis(thisObj: object | unknown): thisObj is CbThis {
          if (thisObj === null) return false;
          if (typeof thisObj === 'object' && 'lastID' in thisObj) return true;
          return false;
        }
        if (err) {
          logger.error(err);
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

  // disabling consistent return because eslint can't make up its mind
  // eslint-disable-next-line consistent-return
  updateRecord(req: Request, res: Response, next: NextFunction): void {
    const reqBody: object | undefined = req.body as object | undefined;
    const isReqParamsFormatted = req.params.id !== undefined;
    if (!reqBody || !isReqParamsFormatted) {
      return next(new InfernodeError(
        'The request body was not formatted correctly',
        'There was an error in updateRecord',
        500,
        'DBController',
      ));
    }
    res.locals.id = Number(req.params.id);
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
    // disabled consistent return here bc eslint for some reason expects a return from a void func
    // eslint-disable-next-line consistent-return
    captureDB.run(updateSQL, (err): void => {
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
  },

  deleteRecord(req: Request, res: Response, next: NextFunction): void {
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
