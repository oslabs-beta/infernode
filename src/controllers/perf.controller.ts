/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { spawnSync, execSync } from 'child_process';
import { InfernodeError } from '../utils/globalErrorHandler';
import logger from '../utils/logging';
import fs from 'fs';
import os from 'os';

type PerfControllerType = {
  runPerf: (req: Request, res: Response, next: NextFunction) => void;
  foldPerf: (req: Request, res: Response, next: NextFunction) => void;
};

type ReqBodyPID = {
  pid?: number,
  duration: number,
};

const perfController: PerfControllerType = {
  runPerf: (req: Request, res: Response, next: NextFunction) => {

    // Verify appropriate OS and permissions
    if (res.locals?.envOS !== 'linux') {
      logger.debug('Skipping perf capture due to OS');
      return next();
    }
    if (!res.locals?.envSudo) logger.error('skipping perf capture due to insufficient sudo permissions');

    try {
      const reqBody = req.body as ReqBodyPID;
      const resLocals = res.locals as ReqBodyPID;
      if ('pid' in reqBody) {
        if (typeof reqBody.pid !== 'number') {
          logger.error(`perfController received non-numeric pid: ${reqBody.pid}`);
        }
      }
      let pid;
      if ('pid' in reqBody || 'pid' in resLocals) {
        pid = 'pid' in reqBody ? reqBody.pid : resLocals.pid;
      } else {
        logger.error('perfController did not receive a pid')
      }
      
      const { duration } = reqBody;
      
      const { id } = res.locals;
      if (typeof pid !== 'number' || typeof duration !== 'number' || typeof id !== 'number') {
        logger.error('non-numeric PID or duration');
      }

      // const {uid, gid}  = os.userInfo();
      const output = path.resolve(__dirname, `../../database/captures/${id}.stacks`);
      const perfCommand = `perf record -o ${output}.raw -F99 -p ${pid} -g  -- sleep ${duration}`
      logger.debug(`Running: ${perfCommand}`);
      execSync(`${perfCommand}`);
      // fs.chown(`${output}.raw`, uid, gid, (err) => logger.error(`Unable to chown ${output} to ${uid}:${gid}: `, err));
      execSync(`perf script --input ${output}.raw > ${output}`);
      if (!fs.existsSync(output)) {
        logger.error(`perf capture output file does not exist: ${output}`)
      }
      return next();
    } catch (err) {
      return next(new InfernodeError(
        'something failed while running the perf capture',
        'something broke in the perfController middleware',
        500,
        'runDtrace',
      ));
    }
  },

  foldPerf: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals?.envOS !== 'linux') {
      console.log('Skipping perf folding due to OS');
      return next();
    }
    try {
      const { id } = res.locals;
      if (typeof id !== 'number') {
        throw TypeError('id is incorrect type');
      }
      const script = path.resolve(__dirname, '../../src/perlScripts/stackCollapse-perf.pl');
      const input = path.resolve(__dirname, `../../database/captures/${id}.stacks`);
      const output = path.resolve(__dirname, `../../database/folded/${id}.folded`);
      const result = spawnSync(`${script} ${input} > ${output}`, { shell: true, timeout: 10000 });
      console.log(`${new Date().toLocaleString()}: Folded perf file ${JSON.stringify(result.status)}`);
      if (result.status === 0) return next();
      throw Error(`Error occurred in spawnSync: ${String(result.status)}`);
    } catch (err) {
      return next(new InfernodeError(
        'something failed while folding the perf file',
        'something broke in the perfController middleware',
        500,
        'foldDtrace',
      ));
    }
  },
};

export default perfController;
