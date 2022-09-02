/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import process from 'process';
import path from 'path';
import { spawn } from 'child_process';
import { InfernodeError } from '../utils/globalErrorHandler';

type ApplicationControllerType = {
  nodeLaunch: (req: Request, res: Response, next: NextFunction) => void;
  nodeKill: (req: Request, res: Response, next: NextFunction) => void;
};

type ReqBody = {
  filePath: string;
  // duration: number;
};
// note reqBody and Reqbody are not the same thing
function isReqBody(reqBody: ReqBody | object): reqBody is ReqBody {
  const hasFilePath = 'filePath' in reqBody && typeof reqBody.filePath === 'string';
  // const hasDuration = 'duration' in reqBody && typeof reqBody.duration === 'number';
  if (hasFilePath /* && hasDuration */) return true;
  return false;
}

const applicationController: ApplicationControllerType = {
  nodeLaunch: (req: Request, res: Response, next: NextFunction) => {
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
      // res.locals.duration = reqBody.duration;
      res.locals.filepath = filepath;
      // refactor to match front end
      const result = spawn(`node ${filepath}`, { shell: true });
      // result will be a child process
      result.on('spawn', () => {
        const { pid } = result;
        console.log('child process started pid:', pid);
        // console.log(process);
        res.locals.pid = pid;
        return next();
      });
      result.on('exit', () => {
        // if (typeof res.locals.pid !== 'number') throw new Error();
        // this.endProcess(res.locals.pid);
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
  },
  nodeKill: (req: Request, res: Response, next: NextFunction) => {
    // retrieve the pid from somewhere
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { pid } = req.body;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
  },
};

export default applicationController;
