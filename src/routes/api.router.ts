import {NextFunction, Router, Request, Response} from 'express';

const apiRouter = Router();

apiRouter.get('/',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toLocaleString()}: apiRouter handling ${req.method} ${req.url}`);
    return next({message: 'GET /api/ not yet implemented'})
  }
)

// Create
apiRouter.post('/captures',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toLocaleString()}: apiRouter handling ${req.method} ${req.url}`);
    next({message: 'POST /api/captures/ not yet implemented'})
  }
)

// Create/Update by ID
apiRouter.put('/captures/:id',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toLocaleString()}: apiRouter handling ${req.method} ${req.url}`);
    next({message: 'PUT /api/captures/:id not yet implemented'})
  }
)

// Read
apiRouter.get('/captures',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toLocaleString()}: apiRouter handling ${req.method} ${req.url}`);
    next({message: 'GET /api/captures/ not yet implemented'});
  }
)

// Read All
apiRouter.get('/captures/:id',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toLocaleString()}: apiRouter handling ${req.method} ${req.url}`);
    next({message: 'GET /api/captures/:id not yet implemented'})
  }
)

// Update
apiRouter.patch('/captures/:id',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toLocaleString()}: apiRouter handling ${req.method} ${req.url}`);
    next({message: 'PATCH /api/captures/:id not yet implemented'})
  }
)

// Delete
apiRouter.delete('/captures/:id',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toLocaleString()}: apiRouter handling ${req.method} ${req.url}`);
    next({message: 'DELETE /api/captures/:id not yet implemented'})
  }
)

export default apiRouter;