import { HealthController } from './health.controller';
import { NotFoundController } from './notfound.controller';

export const notFoundController = new NotFoundController();
export const healthController = new HealthController(
  'STARTING',
  'NOT YET LIVE',
  'NOT YET READY',
  'NOT YET HEALTHY'
);
