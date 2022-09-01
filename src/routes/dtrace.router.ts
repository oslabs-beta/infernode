import { Router, Request, Response } from 'express';
import dbController from '../controllers/db.controller';
import DtraceController from '../controllers/dTrace.controller';
import flamegraphController from '../controllers/flamegraphController';
import icicleController from '../controllers/icicle.controller';
import applicationController from '../controllers/application.controller';

const dtraceRouter = Router();

// run dtrace on an already running node app, then generate flamegraph
dtraceRouter.post(
  '/flamegraph',
  // applicationController.getPID
  dbController.createEmptyRecord,
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
  // applicationController.getPID
  dbController.createEmptyRecord,
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
  applicationController.nodeLaunch,
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
  applicationController.nodeLaunch,
  DtraceController.runDtrace,
  DtraceController.foldDtrace,
  icicleController.toIcicleSVG,
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

export default dtraceRouter;
