import HealthController from './health.controller';
import NotFoundController from './notfound.controller';
import FileController from './file.controller';

export const fileController = new FileController();
export const notFoundController = new NotFoundController();
export const healthController = new HealthController(
  'STARTING',
  'NOT YET LIVE',
  'NOT YET READY',
  'NOT YET HEALTHY',
);
