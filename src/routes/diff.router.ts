import { Router, Request, Response } from 'express';
import diffController from '../controllers/diff.controller';
import dbController from '../controllers/db.controller';

const diffRouter = Router();

diffRouter.post(
  '/:differential',
  dbController.createEmptyRecord,
  // dbController.updateRecord,
  diffController.flamegraphDiff,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.diffID);
  },
);

export default diffRouter;
