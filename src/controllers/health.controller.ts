import { Request, Response } from 'express';
import process from 'node:process';
import {
  HealthCheckResponse,
  StartedCheckResponse,
  LivelinessCheckResponse,
  ReadinessCheckResponse,
} from '../interfaces/health.interface';

/**
 * Contains the logic for health checks and responses
 * @param {string} initStarted - Initial status for /{health}/started check
 * @param {string} initLiveliness - Initial status for /{health}/live check
 * @param {string} initReadiness - Initial status for /{health}/ready check
 * @param {string} initHealthiness - Initial status for /{health}/ check
 */
export default class HealthController {
  private started: StartedCheckResponse;

  private liveliness: LivelinessCheckResponse;

  private readiness: ReadinessCheckResponse;

  private healthiness: HealthCheckResponse;

  constructor(
    initStarted: string,
    initLiveliness: string,
    initReadiness: string,
    initHealthiness: string,
  ) {
    this.started = {
      name: 'StartedCheck',
      status: initStarted,
      data: {
        started_on: Date.now(),
        uptime: process.uptime(),
        pid: process.pid,
        proc_arguments: process.argv,
        node_arguments: process.execArgv,
        total_cpu_usage: process.cpuUsage(),
        curr_mem_usage: process.memoryUsage(),
      },
    };
    this.liveliness = {
      name: 'LivenessCheck',
      status: initLiveliness,
      data: {
        api_self_check: 'not implemented',
      },
    };
    this.readiness = {
      name: 'ReadinessCheck',
      status: initReadiness,
      data: {
        db_connected: false,
        db_version: 'n/a',
      },
    };
    this.healthiness = {
      name: 'HealthinessCheck',
      status: initHealthiness,
      checks: [this.started, this.liveliness, this.readiness],
    };
  }

  /* Checks if the process has started and has available metrics */
  private checkStarted() {
    try {
      this.started.data.uptime = process.uptime();
      this.started.data.total_cpu_usage = process.cpuUsage();
      this.started.data.curr_mem_usage = process.memoryUsage();
      this.started.status = 'STARTED';
    } catch {
      this.started.status = 'FAILED';
    }
  }

  /* Checks if the server is alive */
  private checkLiveliness() {
    this.liveliness.status = 'LIVE';
  }

  /* Checks if the server is ready for requests */
  private checkReadiness() {
    this.readiness.status = 'READY';
    this.readiness.data.db_connected = true;
    // try {
    //   // todo: clean up test inserts after successful read to avoid ever-expanding DB
    //   captureDB.run(
    //     `INSERT INTO capture VALUES (1, 'Test capture', '8/16/2022', 'Dzidupe', 'Test app', 0)`,
    //     (err) => {
    //       if (err) {
    //         throw err;
    //       }
    //     }
    //   );
    //   captureDB.all(`SELECT * FROM capture`, (err, rows) => {
    //     rows.forEach(el => {
    //       console.log(el);
    //     })
    //   });
    //   captureDB.all(`select sqlite_version();`, (err, rows) => {
    //     this.readiness.data.db_version = rows[0];
    //   });
    //   this.readiness.data.db_connected = true;
    //   console.log('Readiness check succeeded!')
    //   this.readiness.status = 'READY';
    // }
    // catch {
    //   console.log('Readiness check failed!')
    //   this.readiness.status = 'NOT READY';
    // }
  }

  /* Checks if the server is healthy by checking applicable sub-checks */
  private checkHealthiness() {
    this.checkStarted();
    this.checkLiveliness();
    this.checkReadiness();
    if (
      this.started.status === 'STARTED'
      && this.liveliness.status === 'LIVE'
      && this.readiness.status === 'READY'
    ) {
      this.healthiness.status = 'OK';
    } else {
      this.healthiness.status = 'UNHEALTHY';
    }
  }

  /* Middleware for /{health}/started requests */
  public getStarted(req: Request, res: Response) {
    this.checkStarted();
    if (this.started.status === 'STARTED') res.status(200);
    else res.status(503);

    // If client accepts HTML and not JSON, return pretty-printed HTML, otherwise return JSON
    if (
      req.headers.accept?.match(/text\/html/g)
      && !req.headers.accept?.match(/application\/json/g)
    ) {
      return res.send(`<pre>${JSON.stringify(this.started, null, 4)}</pre>`);
    }
    return res.json(this.started);
  }

  /* Middleware for /{health}/live requests */
  public getLiveliness(req: Request, res: Response) {
    this.checkLiveliness();
    if (this.liveliness.status === 'LIVE') res.status(200);
    else res.status(503);

    // If client accepts HTML and not JSON, return pretty-printed HTML, otherwise return JSON
    if (
      req.headers.accept?.match(/text\/html/g)
      && !req.headers.accept?.match(/application\/json/g)
    ) {
      return res.send(`<pre>${JSON.stringify(this.liveliness, null, 4)}</pre>`);
    }
    return res.json(this.liveliness);
  }

  /* Middleware for /{health}/ready requests */
  public getReadiness(req: Request, res: Response) {
    this.checkReadiness();
    if (this.readiness.status === 'READY') res.status(200);
    else res.status(503);

    // If client accepts HTML and not JSON, return pretty-printed HTML, otherwise return JSON
    if (
      req.headers.accept?.match(/text\/html/g)
      && !req.headers.accept?.match(/application\/json/g)
    ) {
      return res.send(`<pre>${JSON.stringify(this.readiness, null, 4)}</pre>`);
    }
    return res.json(this.readiness);
  }

  /* Middleware for /{health}/ requests */
  getHealthiness(req: Request, res: Response) {
    this.checkHealthiness();
    if (this.healthiness.status === 'OK') res.status(200);
    else res.status(503);

    // If client accepts HTML and not JSON, return pretty-printed HTML, otherwise return JSON
    if (
      req.headers.accept?.match(/text\/html/g)
      && !req.headers.accept?.match(/application\/json/g)
    ) {
      return res.send(
        `<pre>${JSON.stringify(this.healthiness, null, 4)}</pre>`,
      );
    }
    return res.json(this.healthiness);
  }
}
