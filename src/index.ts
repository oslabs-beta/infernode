import dotenv from 'dotenv'; // Used for runtime config (listener port, secrets, debug logging)
import Server from './server';
import apiRouter from './routes/api.router';
import HealthRouter from './routes/health.router';
import NotFoundRouter from './routes/notFound.router';
import { globalErrorHandler } from './utils/globalErrorHandler';

dotenv.config();

/* If the environment variable EXPRESS_PORT is set, use that port, otherwise use 3000. */
const port: number = Number(process.env.EXPRESS_PORT) || 8008;

/* Instantiate a Server with the port, an array of middleware, and the HealthRouter. */
const server = new Server(port, [apiRouter], HealthRouter, NotFoundRouter, globalErrorHandler);

/* Start server, export for use with Jest setup/teardown */
server.listen();
export default server;
