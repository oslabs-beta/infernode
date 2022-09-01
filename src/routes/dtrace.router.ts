import { Router, Request, Response } from 'express';
import dbController from '../controllers/db.controller';
import DtraceController from '../controllers/dTrace.controller';
import flamegraphController from '../controllers/flamegraphController';
import icicleController from '../controllers/icicle.controller';

const dtraceRouter = Router();

// run dtrace on an already running node app, then generate flamegraph
dtraceRouter.post(
  '/flamegraph',
  // DtraceController.getPID
  DtraceController.runDtrace,
  DtraceController.foldDtrace,
  flamegraphController.toSVG,
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

// run dtrace on an already running node app, then generate icicle chart
dtraceRouter.post(
  '/icicle',
  // DtraceController.getPID
  DtraceController.runDtrace,
  DtraceController.foldDtrace,
  icicleController.toIcicleSVG,
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

// start node app, create a new flamegraph with a dtrace
dtraceRouter.post(
  '/run/flamegraph',
  dbController.createEmptyRecord,
  DtraceController.nodeLaunch,
  DtraceController.runDtrace,
  DtraceController.foldDtrace,
  flamegraphController.toSVG,
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

// start node app, create a new icicle chart with a dtrace
dtraceRouter.post(
  '/run/icicle',
  dbController.createEmptyRecord,
  DtraceController.nodeLaunch,
  DtraceController.runDtrace,
  DtraceController.foldDtrace,
  icicleController.toIcicleSVG,
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

export default dtraceRouter;