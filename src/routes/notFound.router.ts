import { Router, Request, Response } from 'express';
import { notFoundController } from '../controllers/controllers.module';
import process from 'node:process';

const notFoundRouter = Router();

notFoundRouter.use((req: Request, res: Response) => {
  if (process.env.NODE_ENV === 'development') notFoundController.info(req, res);
  else notFoundController.default(req, res);
});

export default notFoundRouter;
