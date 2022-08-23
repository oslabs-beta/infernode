/* eslint-disable no-console */
import {
  NextFunction, Router, Request, Response,
} from 'express';
import flamegraph from '../controllers/flamegraphController';
import { fileController } from '../controllers/controllers.module';

const apiRouter = Router();

apiRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${new Date().toLocaleString()}: apiRouter handling ${req.method} ${
      req.url
    }`,
  );
  return next({ message: 'GET /api/ not yet implemented' });
});

// This middleware was used for testing
// const will = (req: Request, res: Response, next: NextFunction) => {
//   res.locals.id = 'test';
//   return next();
// };

// Create
apiRouter.post(
  '/captures',
  // will /* will's middlware, */,
  fileController.addData,
  flamegraph.stackCollapse,
  flamegraph.toSVG,
  (req: Request, res: Response) => res
    .status(200)
    .send('svg file created and stored in the /database/SVGs'),
  // what we send back to the client will depend on the front end
  // architecture and how we want the user to see what they just uploaded

);

// Create/Update by ID
apiRouter.put(
  '/captures/:id',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(
      `${new Date().toLocaleString()}: apiRouter handling ${req.method} ${
        req.url
      }`,
    );
    next({ message: 'PUT /api/captures/:id not yet implemented' });
  },
);

// Read
apiRouter.get(
  '/captures', /* dbController.getAllMetaData */
  (req: Request, res: Response) => res.status(200).json('Fetch meta data sucessfully'),
);

// Read All
apiRouter.get(
  '/captures/:id', // req.param
  fileController.deliverSVG,
  (req: Request, res: Response, next: NextFunction) => {
    console.log(
      `${new Date().toLocaleString()}: apiRouter handling ${req.method} ${
        req.url
      }`,
    );
    next({ message: 'GET /api/captures/:id not yet implemented' });
  },
);

// Update
apiRouter.patch(
  '/captures/:id',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(
      `${new Date().toLocaleString()}: apiRouter handling ${req.method} ${
        req.url
      }`,
    );
    next({ message: 'PATCH /api/captures/:id not yet implemented' });
  },
);

// Delete
apiRouter.delete(
  '/captures/:id',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(
      `${new Date().toLocaleString()}: apiRouter handling ${req.method} ${
        req.url
      }`,
    );
    next({ message: 'DELETE /api/captures/:id not yet implemented' });
  },
);

// define a global err handler based on the server.globalError method

export default apiRouter;
