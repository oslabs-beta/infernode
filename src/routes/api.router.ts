/* eslint-disable no-console */
import {
  NextFunction, Router, Request, Response,
} from 'express';
import flamegraph from '../controllers/flamegraphController';
import { fileController } from '../controllers/controllers.module';
import dbController from '../controllers/db.controller';

const apiRouter = Router();

// API Root
apiRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${new Date().toLocaleString()}: API Root apiRouter handling ${req.method} ${
      req.url
    }`,
  );
  return next({ message: 'GET /api/ not yet implemented' });
});

// Create
apiRouter.post(
  '/captures',
  dbController.createEmptyRecord,
  dbController.updateRecord,
  fileController.addData,
  flamegraph.stackCollapse,
  flamegraph.toSVG,
  (_req: Request, res: Response) => {
    res.status(200).redirect('/api/captures');
  },
  // what we send back to the client will depend on the front end
  // architecture and how we want the user to see what they just uploaded
);

// Create by ID
apiRouter.put(
  '/captures/:id',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(
      `${new Date().toLocaleString()}: Create by ID apiRouter handling ${req.method} ${
        req.url
      }`,
    );
    next({ message: 'PUT /api/captures/:id not yet implemented' });
  },
);

// Read All
apiRouter.get(
  '/captures', /* dbController.getAllMetaData */
  dbController.getAllRows,
  (req: Request, res: Response) => res.status(200).json(res.locals.rows),
);

// Read by ID
apiRouter.get(
  '/captures/:id', // req.param
  (req: Request, res: Response, next: NextFunction) => {
    console.log(
      `${new Date().toLocaleString()}: Read by ID apiRouter handling ${req.method} ${
        req.url
      }`,
    );
    return next();
  },
  fileController.deliverSVG,
);

// Update by ID
apiRouter.patch(
  '/captures/:id',
  dbController.updateRecord,
  (req: Request, res: Response) => {
    console.log(
      `${new Date().toLocaleString()}: Update by ID apiRouter handling ${req.method} ${
        req.url
      }`,
    );
    res.sendStatus(200);
  },
);

// Delete by ID
apiRouter.delete(
  '/captures/:id',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(
      `${new Date().toLocaleString()}: Delete by ID apiRouter handling ${req.method} ${
        req.url
      }`,
    );
    next({ message: 'DELETE /api/captures/:id not yet implemented' });
  },
);

export default apiRouter;
