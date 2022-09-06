import { Router, Request, Response } from 'express';
import dbController from '../controllers/db.controller';
import DtraceController from '../controllers/dTrace.controller';
import perfController from '../controllers/perf.controller';
import flamegraphController from '../controllers/flamegraphController';
import icicleController from '../controllers/icicle.controller';
import applicationController from '../controllers/application.controller';
import { envController } from '../controllers/controllers.module';

const dtraceRouter = Router();

// run dtrace on an already running node app, then generate flamegraph
dtraceRouter.post(
  '/flamegraph',
  // applicationController.getPID
  envController.detect,
  dbController.createEmptyRecord,
  DtraceController.runDtrace,
  perfController.runPerf,
  DtraceController.foldDtrace,
  perfController.foldPerf,
  flamegraphController.toSVG,
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

// run dtrace on an already running node app, then generate icicle chart
dtraceRouter.post(
  '/icicle',
  // applicationController.getPID
  envController.detect,
  dbController.createEmptyRecord,
  DtraceController.runDtrace,
  perfController.runPerf,
  DtraceController.foldDtrace,
  perfController.foldPerf,
  icicleController.toIcicleSVG,
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

// start node app, create a new flamegraph with a dtrace
dtraceRouter.post(
  '/run/flamegraph',
  envController.detect,
  dbController.createEmptyRecord,
  applicationController.nodeLaunch,
  DtraceController.runDtrace,
  perfController.runPerf,
  DtraceController.foldDtrace,
  perfController.foldPerf,
  flamegraphController.toSVG,
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

// start node app, create a new icicle chart with a dtrace
dtraceRouter.post(
  '/run/icicle',
  envController.detect,
  dbController.createEmptyRecord,
  applicationController.nodeLaunch,
  DtraceController.runDtrace,
  perfController.runPerf,
  DtraceController.foldDtrace,
  perfController.foldPerf,
  icicleController.toIcicleSVG,
  (_req: Request, res: Response) => {
    res.status(200).send('test successful');
  },
);

export default dtraceRouter;
