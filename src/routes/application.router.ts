import { Router, Request, Response } from 'express';
import ApplicationController from '../controllers/application.controller';

const applicationRouter = Router();

// start the application
applicationRouter.post(
  '/start',
  ApplicationController.nodeLaunch,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.pid);
  },
);

// stop the application
applicationRouter.post(
  '/stop',
  ApplicationController.nodeKill,
  (_req: Request, res: Response) => {
    res.status(200).send('Congrats! Your child process was successfully killed');
  },
);

// route to access the back-end state of current running node apps
applicationRouter.post(
  '/status',
  ApplicationController.getStatus,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.status);
  },
);

export default applicationRouter;
