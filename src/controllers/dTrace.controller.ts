/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
// import captureDB, { Capture } from '../models/captureModel';
// import { DbCInterface, CbThis } from '../interfaces/dbcontroller.interface';
import path from 'path';
import { spawnSync, spawn, execSync } from 'child_process';
import { InfernodeError } from '../utils/globalErrorHandler';

/*
Dtrace command to convert .txt to .svg
$ ./stackcollapse.pl filename.txt | ./flamegraph.pl > filename.svg

the application to profile will arrive on the req body of the first middleware function
the perl scripts from Gregg will convert .txt to .svg
we need to use a Dtrace tool to profile the application and output a .txt stack trace
from there the .pl files will do all the heavy lifting

The following example uses DTrace to sample user-level stacks at
99 Hertz for processes named "mysqld",
and then generates the flame graph

# dtrace -x ustackframes=100 -n 'profile-99 /execname == "mysqld" && arg1/ { @[ustack()] = count(); } tick-60s { exit(0); }' -o out.stacks
# ./stackcollapse.pl out.stacks > out.folded
# ./flamegraph.pl out.folded > out.svg

the provider manages probes, which is a tiny unit of observability.
the provider deploys and communicates with the probe.

probe / predicate / {actions}
dtrace -x stackframes=100 -n 'profile-997 /arg0/ { @[stack()] = count(); } tick-60s { exit(0); }' -o out.kern_stacks


function 1
first run a node command with the relative file path to launch the application
then retrieve the pid of the running application

function 2
then run dTrace on that pid, dumping a stack trace

function 3
then fold the stack trace,

already exists
convert to svg, then send it back!
*/

type DtraceControllerType = {
  // launch the node application, save the PID
  nodeLaunch: (req: Request, res: Response, next: NextFunction) => void;
  // run Dtrace on the given node application
  runDtrace: (req: Request, res: Response, next: NextFunction) => void;
  // fold the Dtrace output to collapse matching stack frames
  foldDtrace: (req: Request, res: Response, next: NextFunction) => void;
  // stack traces are folded using a perl script from Brendan Gregg,
  // DO NOT EDIT THESE .pl FILES
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

const DtraceController: DtraceControllerType = {
  nodeLaunch: (req: Request, res: Response, next: NextFunction) => {
    // recieve executable filepath and second from user
    const reqBody = req.body as ReqBody | object;
    // console.log(reqBody);
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
      // refactor to match front end
      const result = spawn(`node ${filepath}`, { shell: true });
      result.on('spawn', (code: unknown) => {
        // result will be a child process
        const { pid } = result;
        console.log(pid);
        res.locals.pid = pid;
        console.log('Code: ', code);
        return next();
      });
    } catch (err) {
      return next(new InfernodeError(
        'something failed while launching the app via node',
        'something broke in the DtraceController middleware',
        500,
        'nodeLaunch',
      ));
    }
    // const result3 = spawn(`start dtrace capture`, { shell: true });
    //     // start dtrace capture in async shell
    // });
  },

  runDtrace: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pid, duration, id } = res.locals;
      // const pid = 67497;
      if (typeof pid !== 'number' || typeof duration !== 'number' || typeof id !== 'number') {
        throw TypeError('Check that PID and duration are numbers');
      }
      const probe = '-x ustackframes=100 -n';
      const predicate = `profile-97 /pid == ${pid} && arg1/ { @[ustack()] = count(); } tick-${duration}s { exit(0); }`;
      const output = path.resolve(__dirname, `../../database/captures/${id}.stacks`);
      // const output = path.resolve(__dirname, `${id}.stacks`);
      const result = execSync(`open http://localhost:4000 && sudo dtrace ${probe} '${predicate}' -o ${output}`);
      console.log(result.toString());
      // if (result.status === 0)
      return next();
      // throw Error(`something went wrong in runDtrace: ${String(result.status)}`);
    } catch (err) {
      return next(new InfernodeError(
        'something failed while running the DTrace capture',
        'something broke in the DtraceController middleware',
        500,
        'runDtrace',
      ));
    }
  },

  foldDtrace: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = res.locals;
      if (typeof id !== 'number') {
        throw TypeError('id is incorrect type');
      }
      const script = path.resolve(__dirname, '../../src/perlScripts/stackCollapse-Dtrace.pl');
      const input = path.resolve(__dirname, `../../database/captures/${id}.stacks`);
      const output = path.resolve(__dirname, `../../database/folded/${id}.folded`);
      const result = spawnSync(`${script} ${input} > ${output}`, { shell: true, timeout: 10000 });
      console.log(result.stderr.toString());
      console.log(`${new Date().toLocaleString()}: Folded perf file ${JSON.stringify(result.status)}`);
      if (result.status === 0) return next();
      throw Error(`Error occurred in spawnSync: ${String(result.status)}`);
    } catch (err) {
      return next(new InfernodeError(
        'something failed while folding the DTrace file',
        'something broke in the DtraceController middleware',
        500,
        'foldDtrace',
      ));
    }
  },
};

export default DtraceController;
