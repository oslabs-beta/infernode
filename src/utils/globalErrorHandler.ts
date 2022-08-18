import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import process from 'node:process';

export class InfernodeError extends Error {
  userMessage?: string;
  httpStatus?: number;
  controller?: string;

  constructor(
    message: string,
    userMessage: string = 'an unknown error occurred',
    httpStatus: number = 500,
    controller: string = 'unknown'
  ) {
    super(message);
    (this.userMessage = userMessage),
      (this.httpStatus = httpStatus),
      (this.controller = controller);
  }
}

export const globalErrorHandler: ErrorRequestHandler = (
  err: InfernodeError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.httpStatus === undefined) err.httpStatus = 500;
  if (err.userMessage === undefined)
    err.userMessage = 'an unknown error occurred';
  console.table({
    ...err,
    req_method: req.method,
    req_path: req.path,
  });
  if (process.env.NODE_ENV === 'development') {
    return res
      .status(err.httpStatus)
      .jsonp({ ...err, req_method: req.method, req_path: req.path });
  } else {
    return res.status(err.httpStatus).json(err.userMessage);
  }
};
