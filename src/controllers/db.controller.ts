import { Request, Response, NextFunction } from "express";
import captureDB from "../models/captureModel";
import DbBody from "../interfaces/dbcontroller.interface";
import InfernodeError from "../utils/InfernodeError.class";
export class DBController {
  nextID: number;

  constructor() {
    this.nextID = 0;
  }

  public createRecord = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { capture_name, date, creator, app_name, data }: DbBody = req.body;

      console.log(req.body)
      console.log(this)

      let insertSQL: string = 'INSERT INTO capture (id, capture_name, date, creator, app_name, data)';
      insertSQL += ` VALUES (?, ?, ?, ?, ?, ?)`;
      captureDB.all(insertSQL, 
        this.nextID,
        capture_name,
        date,
        creator,
        app_name,
        data,        
        (err: Error, rows: any[]) => {
          if (err) {
            console.table(err);
            console.log(err)
            return next(new InfernodeError('Unable to insert capture into DB', 
            'An error occurred when trying to insert the capture into the DB', 500, 
            'DBController'));
          }
          res.locals.id = this.nextID++;
          return next();
      });
    }
    catch (err) {
      console.log(err);
      next(new InfernodeError('An error occured.', 
      'An error occurred. It could be an issue with the request body', 500, 
      'DBController'))
    }
  }
}