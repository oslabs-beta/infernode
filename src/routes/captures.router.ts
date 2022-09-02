/* eslint-disable no-console */
import {
  NextFunction, Router, Request, Response,
} from 'express';
import flamegraph from '../controllers/flamegraphController';
import { fileController } from '../controllers/controllers.module';
import dbController from '../controllers/db.controller';

const captureRouter = Router();

/*
*
* modify your backend router logic in the following fake requests
*
*/

// fake reqeust to start app: response value is pid
captureRouter.post('/startApp', /* req.body has appName, relativePath => middlewarelogic: start app, */ (req: Request, res: Response) => {
  console.log('start App request sucessfully');
  return res.status(200).json('12345');
});

// fake reqeust to stop app
captureRouter.post('/stopApp', /* req.body has pid => middlewarelogic: stop app, */ (req: Request, res: Response) => {
  console.log('stopt App request sucessfully');
  return res.status(200).json('stop app sucessfully');
});

// fake reqeust to start capture
captureRouter.post('/startCapture', /* req.body has pid, duration => middlewarelogic: start capture, */ (req: Request, res: Response) => {
  console.log('start capture request sucessfully');
  return res.status(200).json('start capture sucessfully');
});

// fake request to ask for app process status
captureRouter.get('/isAppRunning', /* req.body has pid, duration => middlewarelogic: start capture, */ (req: Request, res: Response) => {
  console.log('app running polling continuously');
  return res.status(200).json('finished');
});

// Create
captureRouter.post(
  '/',
  dbController.createEmptyRecord,
  fileController.addData,
  flamegraph.stackCollapse,
  flamegraph.toSVG,
  (_req: Request, res: Response) => res.sendStatus(200),
);

// Create by ID
captureRouter.put(
  '/:id',
  (req: Request, _res: Response, next: NextFunction) => {
    console.log(
      `${new Date().toLocaleString()}: Create by ID apiRouter handling ${
        req.method
      } ${req.url}`,
    );
    return next({ message: 'PUT /api/captures/:id not yet implemented' });
  },
);

// Read All
captureRouter.get(
  '/',
  dbController.getAllRows,
  (_req: Request, res: Response) => res.status(200).json(res.locals.rows),
);

// Read by ID
captureRouter.get(
  '/:id',
  fileController.deliverSVG,
);

// Update by ID
captureRouter.patch(
  '/:id',
  dbController.updateRecord,
  (_req: Request, res: Response) => res.status(200).json(res.locals.rowFromID),
);

// Delete by ID
captureRouter.delete(
  '/:id',
  dbController.deleteRecord,
  (_req: Request, res: Response) => res.status(200).json(res.locals.rowFromID),
);

export default captureRouter;
