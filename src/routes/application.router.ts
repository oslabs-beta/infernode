import { Router, Request, Response } from 'express';
import ApplicationController from '../controllers/application.controller';

const applicationRouter = Router();

// start the application
applicationRouter.post(
  '/start',
  ApplicationController.nodeLaunch,
  (_req: Request, res: Response) => {
    res.status(200).send('node app launched');
  },
);

// stop the application
applicationRouter.get(
  '/stop',
  ApplicationController.nodeKill,
  (_req: Request, res: Response) => {
    res.status(200).send('Congrats! Your child process was successfully murdered');
  },
);

export default applicationRouter;
