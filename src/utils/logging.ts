import { Request, Response } from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';

const logFile = pino.destination('./infernode.log');
const stdErr = pino.destination(1);
const prodLogLevel = 'info';
const devLogLevel = 'debug';

let dest = logFile;
let level = prodLogLevel;

if (process.env.NODE_ENV === 'development') {
  dest = stdErr;
  level = devLogLevel;
}

const logger = pino(
  {
    level,
  },
  dest,
);

const httpLogger = pinoHttp({
  logger,
  customLogLevel(req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } if (res.statusCode >= 500 || err) {
      return 'error';
    } if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'debug';
    }
    return 'info';
  },
});

export { httpLogger };
export default logger;
