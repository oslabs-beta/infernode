/* eslint-disable no-console */
import {
  NextFunction, Router, Request, Response,
} from 'express';
import captureRouter from './captures.router';
import controlRouter from './control.router';

const apiRouter = Router();

// API Root
apiRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${new Date().toLocaleString()}: API Root apiRouter handling ${req.method} ${
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

apiRouter.use(
  '/control',
  controlRouter,
);

export default apiRouter;
