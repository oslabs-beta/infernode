import express, { Application, Router } from 'express';
import path from 'path';

/**
 * Represents an Express.js server application with an api, health, and static file serving
 * @param {number} port - The server listening port
 * @param {express.Router[]} routes - /api/* Routers
 * @param {express.Router} healthRouter - /health endpoint Router
 * @param {express.Router} notFoundRouter - 404 handler Router
 */
export class Server {
  public app: Application;
  public apiPath: string = '/api';
  public assetPath: string = './assets/';
  public healthPath: string = '/health';

  constructor(private port: number, routes: Router[], healthRouter: Router, notFoundRouter: Router) {
    /* Setup app and functional route handlers */
    this.app = express();
    this.static(this.assetPath);
    this.health(healthRouter);
    this.routes(routes);
    this.notFound(notFoundRouter);


    /* Setup middleware for all requests */
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  /**
   * Configure static file serving
   * @param {string} assetPath - The relative path from which to server static content
   */
  private static(assetPath: string) {
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
   */
  private notFound(route: Router) {
    this.app.use(route);
  }

  /**
   * Configure global error handler
   */
  // private globalError() {
  //   this.app.use();
  // }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `${new Date().toLocaleString()}: 🔥 INFERNOde listening on port ${
          this.port
        } 🔥`
      );
    });
  }
}
