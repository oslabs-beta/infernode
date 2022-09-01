import { Request, Response, NextFunction } from 'express';
import process from 'process';
import path from 'path';
import { spawn } from 'child_process';
import { InfernodeError } from '../utils/globalErrorHandler';

type ProcessInfo = {
  userId: number | null; // Can remove null as an option when auth is implemented
};

type ReqBody = {
  filePath: string;
  duration: number;
};
// note reqBody and Reqbody are not the same thing
function isReqBody(reqBody: ReqBody | object): reqBody is ReqBody {
  const hasFilePath = 'filePath' in reqBody && typeof reqBody.filePath === 'string';
  const hasDuration = 'duration' in reqBody && typeof reqBody.duration === 'number';
  if (hasFilePath && hasDuration) return true;
  return false;
}

export default class ApplicationController {
  private runningProcesses: { [pid: number]: ProcessInfo } = {};

  private startProcess(pid: number) {
    this.runningProcesses[pid] = {
      userId: null,
    };
  }

  private endProcess(pid: number) {
    delete this.runningProcesses[pid];
  }

  public nodeLaunch(req: Request, res: Response, next: NextFunction) {
    // recieve executable filepath and second from user
    const reqBody = req.body as ReqBody | object;
    if (!isReqBody(reqBody)) {
      return next(new InfernodeError(
        'something failed while verifying req.body',
        'user submitted invalid file path',
        500,
        'DtraceController',
      ));
    }
    try {
      const filepath: string = path.resolve(__dirname, `${reqBody.filePath}`);
      res.locals.duration = reqBody.duration;
      res.locals.filepath = filepath;
      // refactor to match front end
      const result = spawn(`node ${filepath}`, { shell: true });
      // result will be a child process
      result.on('spawn', () => {
        const { pid } = result;
        res.locals.pid = pid;
        console.log('Dtrace pid:', pid);
        if (pid === undefined) throw new Error('Something is wrong with the pid');
        this.startProcess(pid);
        return next();
      });

      result.on('close', () => {
        if (typeof res.locals.pid !== 'number') throw new Error();
        this.endProcess(res.locals.pid);
      });
    } catch (err) {
      return next(new InfernodeError(
        'something failed while launching the app via node',
        'something broke in the DtraceController middleware',
        500,
        'nodeLaunch',
      ));
    }
  }

  public nodeKill(req: Request, res: Response, next: NextFunction) {
    // retrieve the pid from somewhere
    try {
      const { pid } = req.body;
      // check if node process is currently running
      // if not, return an error 
      if (typeof pid !== 'number') throw new TypeError('Incorrect type passed in to req.body');
      process.kill(pid);
      return next();
    } catch (err) {
      return next({
        userMessage: 'something went wrong with the nodeStop command',
        message: 'check your application controller',
        controller: 'application.Controller',
      });
    }
  }
}


/*

Cases to consider:
1. Instantiation of Application controller/no active captures running
2. Running captures

Important information to include in the object?
- pid
- node child_process object returned from spawn?
  - Allows direct access to exit code

*/
