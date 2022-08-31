/* eslint-disable no-console */
import {
  NextFunction, Router, Request, Response,
} from 'express';
import flamegraph from '../controllers/flamegraphController';
import { fileController } from '../controllers/controllers.module';
import dbController from '../controllers/db.controller';
import icicleController from '../controllers/icicle.controller';

const captureRouter = Router();

// Create new flamegraph from a .perf
captureRouter.post(
  '/',
  dbController.createEmptyRecord,
  fileController.addData,
  flamegraph.stackCollapse,
  flamegraph.toSVG,
  (_req: Request, res: Response) => res.sendStatus(200),
);

// create a new icicle chart from a .perf
captureRouter.post(
  '/icicle',
  dbController.createEmptyRecord,
  fileController.addData,
  flamegraph.stackCollapse,
  icicleController.toIcicleSVG,
  (_req: Request, res: Response) => res.status(200).redirect('/api/captures'),
);

// create a new flamechart from a .perf
captureRouter.post(
  '/flamechart',
  dbController.createEmptyRecord,
  fileController.addData,
  flamegraph.stackCollapse,
  // flamechartController.toFlamechartSVG,
  (_req: Request, res: Response) => res.status(200).redirect('/api/captures'),
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
