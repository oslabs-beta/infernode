import dotenv from 'dotenv'; // Used for runtime config (listener port, secrets, debug logging)
import { Server } from './server';
import HealthRouter from './routes/health.router';
import NotFoundRouter from './routes/notFound.router';

dotenv.config();

/* If the environment variable EXPRESS_PORT is set, use that port, otherwise use 3000. */
const port: number = Number(process.env.EXPRESS_PORT) || 3000;

/* Instantiate a Server with the port, an array of middleware, and the HealthRouter. */
const server = new Server(port, [], HealthRouter, NotFoundRouter);

/* Start server, export for use with Jest setup/teardown */
const listener = server.listen();
export default listener;
