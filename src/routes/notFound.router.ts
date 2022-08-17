import {Router, Request, Response} from 'express';
import { notFoundController } from '../controllers/controllers.module';

const notFoundRouter = Router();

notFoundRouter.use(
  (req: Request, res: Response) => notFoundController.info(req, res)
)

export default notFoundRouter;