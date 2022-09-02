import { Router, Request, Response } from 'express';
import diffController from '../controllers/diff.controller';

const diffRouter = Router();

diffRouter.post(
  '/',
  diffController.flamegraphDiff,
  (_req: Request, res: Response) => {
    res.status(200).send('diffing successful');
  },
);

export default diffRouter;
