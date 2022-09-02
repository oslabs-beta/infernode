/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { spawnSync, execSync } from 'child_process';
import { InfernodeError } from '../utils/globalErrorHandler';

/*
Dtrace command to convert .txt to .svg
$ ./stackcollapse.pl filename.txt | ./flamegraph.pl > filename.svg

The following example uses DTrace to sample user-level stacks at
99 Hertz for processes named "mysqld", and then generates the flame graph

# sudo dtrace -x ustackframes=100 -n 'profile-99 /execname == "mysqld" && arg1/ { @[ustack()] = count(); } tick-60s { exit(0); }' -o out.stacks

Using DTrace to capture 60 seconds of user-level stacks for PID 12345 at 97 Hertz
dtrace -x ustackframes=100 -n 'profile-97 /pid == 12345 && arg1/ { @[ustack()] = count(); } tick-60s { exit(0); }' -o out.user_stacks

probe / predicate / {actions}
sudo dtrace -x stackframes=100 -n 'profile-997 /arg0/ { @[stack()] = count(); } tick-60s { exit(0); }' -o out.kern_stacks
*/

type DtraceControllerType = {
  // run Dtrace on the given node application, using the pid
  runDtrace: (req: Request, res: Response, next: NextFunction) => void;
  // fold the Dtrace output to collapse matching stack frames
  foldDtrace: (req: Request, res: Response, next: NextFunction) => void;
  // stack traces are folded using a perl script from Brendan Gregg,
  // DO NOT EDIT THESE .pl FILES
};

const DtraceController: DtraceControllerType = {
  runDtrace: (req: Request, res: Response, next: NextFunction) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { pid, duration } = req.body;
      const { id } = res.locals;
      console.log(typeof pid);
      console.log(typeof duration);
      console.log(typeof id);
      if (typeof pid !== 'number' || typeof duration !== 'number' || typeof id !== 'number') {
        throw TypeError('Check that PID and duration are numbers');
      }
      const probe = '-x ustackframes=100 -n';
      const predicate = `profile-150 /pid == ${pid} && arg1/ { @[ustack()] = count(); } tick-${duration}s { exit(0); }`;
      const output = path.resolve(__dirname, `../../database/captures/${id}.stacks`);
      const result = execSync(`sudo dtrace ${probe} '${predicate}' -o ${output}`);
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
