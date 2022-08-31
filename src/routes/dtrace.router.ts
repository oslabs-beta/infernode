import { Router, Request, Response } from 'express';
import dbController from '../controllers/db.controller';
import DtraceController from '../controllers/dTrace.controller';
import flamegraphController from '../controllers/flamegraphController';
import icicleController from '../controllers/icicle.controller';

const dtraceRouter = Router();

// create a new flamegraph with a dtrace
dtraceRouter.post(
  '/',
  dbController.createEmptyRecord,
  DtraceController.nodeLaunch,
  DtraceController.runDtrace,
  DtraceController.foldDtrace,
  flamegraphController.toSVG,
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

// create a new icicle chart with a dtrace
dtraceRouter.post(
  '/icicle',
  dbController.createEmptyRecord,
  DtraceController.nodeLaunch,
  DtraceController.runDtrace,
  DtraceController.foldDtrace,
  icicleController.toIcicleSVG,
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

// create a new flame chart with a dtrace
dtraceRouter.post(
  '/flamechart',
  dbController.createEmptyRecord,
  DtraceController.nodeLaunch,
  DtraceController.runDtrace,
  DtraceController.foldDtrace,
  // flamechartController.toFlamechartSVG,
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

export default dtraceRouter;
