import { Router, Request, Response } from 'express';
import process from 'node:process';
import { notFoundController } from '../controllers/controllers.module';

const notFoundRouter = Router();

notFoundRouter.use((req: Request, res: Response) => {
  if (process.env.NODE_ENV === 'development') notFoundController.info(req, res);
  else notFoundController.default(req, res);
});

export default notFoundRouter;
