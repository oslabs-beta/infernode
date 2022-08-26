import { Request, Response } from 'express';

export default class NotFoundController {
  private title: string;

  private message: string;

  constructor(title = 'Page Not Found', message = 'The requested page could not be found.') {
    this.title = title;
    this.message = message;
  }

  public default(_req: Request, res: Response) {
    return res.status(404).send(`
    <html>was not found.
    <head>
      <title>${this.title}</title>
    </head>
    <body>
      <h1>404: Page Not Found</h1>
      <p>${this.message}</p>
    </body>
    `);
  }

  public info(req: Request, res: Response) {
    return res.status(404).send(`
      <html>
      <head>
        <title>Not Found</title>
      </head>
      <body>
        <h1>404: Page Not Found</h1>
        <p>${this.message}</p>
        <pre>${req.method} ${req.protocol}://${req.hostname}${req.url}</pre>
      </body>
    `);
  }
}
