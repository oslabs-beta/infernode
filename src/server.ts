import express, {
  Application, Router, ErrorRequestHandler,
} from 'express';
import path from 'path';

/**
 * Represents an Express.js server application with an api, health, and static file serving
 * @param {number} port - The server listening port
 * @param {express.Router[]} routes - /api/* Routers
 * @param {express.Router} healthRouter - /health endpoint Router
 * @param {express.Router} notFoundRouter - 404 handler Router
 * @param {ErrorRequestHandler} globalErrorHandler - Error-first handler for request/response errors
 */
export default class Server {
  public app: Application;

  public apiPath = '/api';

  public assetPath = './assets/';

  public healthPath = '/health';

  constructor(
    public port: number,
    routes: Router[],
    healthRouter: Router,
    notFoundRouter: Router,
    globalErrorHandler: ErrorRequestHandler,
  ) {
    /* Setup app and functional route handlers */
    this.app = express();
    this.static();
    this.health(healthRouter);
    this.routes(routes);
    this.notFound(notFoundRouter);
    this.globalError(globalErrorHandler);

    /* Setup middleware for all requests */
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  /**
   * Configure static file serving
   * @param {string} assetPath - The relative path from which to server static content
   */
  private static() {
    this.app.use(express.static(path.resolve(__dirname, this.assetPath)));
  }

  /**
   * Configure the /health route
   * @param {express.Router} router - Router that handles microservice-esque health status requests
   */
  private health(router: Router) {
    this.app.use(this.healthPath, router);
  }

  /**
   * Configure API routes
   * @param {express.Router[]} routes - A list of all Routers to use for the /api endpoint
   */
  private routes(routes: Router[]) {
    routes.forEach((router) => this.app.use(this.apiPath, router));
  }

  /**
   * Configure 404 error handling
   * @param {express.Router} router - Router that handles requests for non-existent pages
   */
  private notFound(route: Router) {
    this.app.use(route);
  }

  /**
   * Configure global error handler
   * @param {ErrorRequestHandler} handler - Error-first handler for request/response errors
   */

  private globalError(handler: ErrorRequestHandler) {
    this.app.use(handler);
  }

  public listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(
        `${new Date().toLocaleString()}: Express.js listening on port ${this.port}`,
      );
    });
  }
}
