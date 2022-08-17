import { Request, Response } from 'express';

export class NotFoundController {
  public default(req: Request, res: Response) {
    return res.sendStatus(404);
  }

  public info(req: Request, res: Response) {
    res.status(404).send(`
      <html>
      <head>
        <title>Not Found</title>
      </head>
      <body>
      <h1>404: Page Not Found</h1>
      Your ${req.method} request to ${req.protocol}://${req.hostname}${req.url} was not found.
      </body>
    `)
  }
}