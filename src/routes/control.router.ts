/* eslint-disable no-console */
import {
  NextFunction, Router, Request, Response,
} from 'express';

// * API Router for interactive capture control
// * Currently just a stub, exact layout will be dependent on how the
// * relevant controllers are written.

const controlRouter = Router();

// API Root
controlRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${new Date().toLocaleString()}: controlRouter handling ${req.method} ${
      req.url
    }`,
  );
  return next({ message: 'GET /api/control not yet implemented' });
});

controlRouter.put('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${new Date().toLocaleString()}: controlRouter handling ${req.method} ${
      req.url
    }`,
  );
  return next({ message: 'PUT /api/control not yet implemented' });
});

export default controlRouter;
