import {
  Request, Response, ErrorRequestHandler,
} from 'express';
import process from 'node:process';
import logger from './logging';

export class InfernodeError extends Error {
  userMessage?: string;

  httpStatus?: number;

  controller?: string;

  constructor(
    message: string,
    userMessage = 'an unknown error occurred',
    httpStatus = 500,
    controller = 'unknown',
  ) {
    super(message);
    this.userMessage = userMessage;
    this.httpStatus = httpStatus;
    this.controller = controller;
  }
}

export const globalErrorHandler: ErrorRequestHandler = (
  err: InfernodeError,
  req: Request,
  res: Response,
) => {
  const errObject: InfernodeError = { ...err };
  if (errObject.httpStatus === undefined) errObject.httpStatus = 500;
  if (errObject.userMessage === undefined) errObject.userMessage = 'an unknown error occurred';
  logger.error(err);
  if (process.env.NODE_ENV === 'development') {
    return res
      .status(errObject.httpStatus)
      .jsonp({ ...err, req_method: req.method, req_path: req.path });
  }
  return res.status(errObject.httpStatus).json(err.userMessage);
};
