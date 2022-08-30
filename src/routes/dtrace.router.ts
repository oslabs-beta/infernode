import { Router, Request, Response } from 'express';
import dbController from '../controllers/db.controller';
import DtraceController from '../controllers/dTrace.controller';
import flamegraphController from '../controllers/flamegraphController';

const dtraceRouter = Router();

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

export default dtraceRouter;
