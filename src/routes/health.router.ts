import { Router, Request, Response } from 'express';
import { healthController } from '../controllers/controllers.module';

const healthRouter = Router();

healthRouter.get(
  '/',
  (req: Request, res: Response) => healthController.getHealthiness(req, res),
);

healthRouter.get(
  '/started',
  (req: Request, res: Response) => healthController.getStarted(req, res),
);

healthRouter.get(
  '/live',
  (req: Request, res: Response) => healthController.getLiveliness(req, res),
);

healthRouter.get(
  '/ready',
  (req: Request, res: Response) => healthController.getReadiness(req, res),
);

export default healthRouter;
