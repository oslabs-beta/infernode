import { Router, Request, Response } from 'express';
import DtraceController from '../controllers/dTrace.controller';
// import dbController from '../controllers/db.controller';
// import flamegraphController from '../controllers/flamegraphController';
// import icicleController from '../controllers/icicle.controller';
// import dtraceRouter from './dtrace.router';

const applicationRouter = Router();

// start the application
applicationRouter.post(
  '/start',
  DtraceController.nodeLaunch,
  (_req: Request, res: Response) => {
    res.status(200).send(res.locals.pid);
  },
);

// stop the application
applicationRouter.post(
  '/stop',
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

export default applicationRouter;
