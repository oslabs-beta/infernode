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
};

type BodyWithPid = {
  pid: number;
};

// note reqBody and Reqbody are not the same thing
function isReqBody(reqBody: ReqBody | object): reqBody is ReqBody {
  const hasFilePath = 'filePath' in reqBody && typeof reqBody.filePath === 'string';
  if (hasFilePath) return true;
  return false;
}

class ApplicationController {
  private runningProcesses: { [pid: number]: ProcessInfo } = {};

  private startProcess(pid: number) {
    this.runningProcesses[pid] = {
      userId: null,
    };
  }

  private endProcess(pid: number) {
    delete this.runningProcesses[pid];
  }

  public getStatus = (req: Request, res: Response, next: NextFunction) => {
    const reqBody = req.body as object | BodyWithPid;
    if (!('pid' in reqBody) || typeof reqBody.pid !== 'number') {
      return next(new InfernodeError(
        'There was an issue with the pid given to getStatus via req.body',
        'check req.body',
        500,
        'Application Controller',
      ));
    }
    res.locals.status = reqBody.pid in this.runningProcesses;
    console.log('Node process -', reqBody.pid, 'is currently:', res.locals.status);
    return next();
  };

  public nodeLaunch = (req: Request, res: Response, next: NextFunction): void => {
    // recieve executable filepath and second from user
    // console.log('req.body is ', req.body);
    const reqBody = req.body as ReqBody | object;
    // console.log('reqBody is ', reqBody);
    if (!isReqBody(reqBody)) {
      return next(new InfernodeError(
        'something failed while verifying req.body',
        'user submitted invalid file path',
        500,
        'Application Controller',
      ));
    }
    try {
      const filePath: string = path.resolve(__dirname, `${reqBody.filePath}`);
      res.locals.filePath = filePath;
      const result = spawn(`node ${filePath}`, { shell: true });
      // result will be a child process
      result.on('spawn', () => {
        const { pid } = result;
        res.locals.pid = pid;
        console.log('child process started pid:', pid);
        if (pid === undefined) throw new Error('Something is wrong with the pid');
        this.startProcess(pid);
        return next();
      });

      result.on('exit', () => {
        // no matter how the process ends, either on its own or from a command
        // this will run when the child process terminates
        if (typeof res.locals.pid !== 'number') throw new Error();
        this.endProcess(res.locals.pid);
        console.log('child process exited gracefully - pid:', res.locals.pid);
      });
    } catch (err) {
      return next(new InfernodeError(
        'something failed while launching the app via node',
        'something broke in the DtraceController middleware',
        500,
        'nodeLaunch',
      ));
    }
  };

  public nodeKill = (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqBody: BodyWithPid | object = req.body as BodyWithPid | object;
      if (!('pid' in reqBody)) {
        throw new Error('There was an issue with the request body given to nodeKill');
      }
      const { pid } = reqBody;
      // check if node process is currently running
      // if not, return an error
      if (typeof pid !== 'number') throw new TypeError('Incorrect type passed in to req.body');
      const result = process.kill(pid);
      console.log('child process killed?', result, ' - pid: ', pid);
      return next();
    } catch (err) {
      return next({
        userMessage: 'something went wrong with the nodeStop command',
        message: 'check your application controller',
        controller: 'application.Controller',
      });
    }
  };
}

export default new ApplicationController();
