import { Request, Response, NextFunction } from "express";
import captureDB from "../models/captureModel";
import DbBody from "../interfaces/dbcontroller.interface";

export class DBController {
  public createRecord(req: Request, res: Response, next: NextFunction) {
    const { capture_name, date, creator, app_name, data }: DbBody = req.body;

    let insertSQL: string = 'INSERT INTO capture (capture_name, date, creator, app_name, data)';
    insertSQL += `VALUES (${capture_name}, ${date}, ${creator}, ${app_name}, ${data}) RETURNING id`;
    captureDB.all(insertSQL, (err, rows) => {
      if (err) {
        return next(err);
      }
      res.locals.id = rows[0].id;
      return next();
    });
  }
}