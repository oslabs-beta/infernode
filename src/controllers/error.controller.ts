import { Request, Response, NextFunction } from 'express';
import InfernodeError from 'src/interfaces/InfernodeError.interface';

export class GlobalErrorController {
  public handler(err: InfernodeError, req: Request, res: Response, next: NextFunction) {
    if (err.httpStatus === undefined) err.httpStatus = 500;
    console.table(err);
    return res.status(err.httpStatus).send(err.message);
  }
}