import { Request, Response, NextFunction } from 'express';
import captureDB from '../models/captureModel';
import DbBody from '../interfaces/dbcontroller.interface';

export default class DBController {
  public createRecord(req: Request, res: Response, next: NextFunction) {
    const {
      capture_name: captureName, date, creator, app_name: appName, data,
    }: DbBody = req.body;

    let insertSQL = 'INSERT INTO capture (capture_name, date, creator, app_name, data)';
    insertSQL += `VALUES (${captureName}, ${date}, ${creator}, ${appName}, ${data}) RETURNING id`;
    captureDB.all(insertSQL, (err, rows) => {
      if (err) {
        return next(err);
      }
      function hasID(rows[0]: | undefined)
      res.locals.id = Number(rows[0].id);
      return next();
    });
  }
}
