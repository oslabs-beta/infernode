/* eslint-disable no-console */
import {
  NextFunction, Router, Request, Response,
} from 'express';
import captureRouter from './captures.router';
import dtraceRouter from './dtrace.router';
import diffRouter from './diff.router';
import applicationRouter from './application.router';
import logger from '../utils/logging';

const apiRouter = Router();

// API Root
apiRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.trace(
    `API Root apiRouter handling ${req.method} ${
      req.url
    }`,
  );
  return next({ message: 'GET /api/ not yet implemented' });
});

// Captures
apiRouter.use(
  '/captures',
  captureRouter,
);

// starting and stopping applications to be profiled
apiRouter.use(
  '/app',
  applicationRouter,
);

// running dtrace captures
apiRouter.use(
  '/dtrace',
  dtraceRouter,
);

// creating differential flamegraphs
apiRouter.use(
  '/diff',
  diffRouter,
);

export default apiRouter;
