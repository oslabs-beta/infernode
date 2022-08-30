// middelware function that will take a .perf and return a .svg
/*
1. run the following command to collapse the stack frames
./stackcollapse-perf.pl out.perf > out.folded

2. run the following command to convert collapsed stack frames into .svg
./flamegraph.pl out.kern_folded > kernel.svg

3. return the .svg to the next middleware function
*/

// exec() method: This method creates a shell first and then executes the command.
import { Request, Response, NextFunction } from 'express';

import { spawnSync } from 'child_process';

import path from 'path';

type FlamegraphSVGController = {
  // collapse the stack traces in the perf:
  stackCollapse: (req: Request, res: Response, next: NextFunction) => void;
  // convert the collapsed stack traces into an SVG:
  toSVG: (req: Request, res: Response, next: NextFunction) => void;
  // this is all done using Perl scripts from Brendan Gregg
  // do not edit these scripts
};

const flamegraphController: FlamegraphSVGController = {
  stackCollapse: (_req: Request, res: Response, next: NextFunction): void => {
    // node child process
    const fileName = Number(res.locals.id);
    const inputPath: string = path.resolve(
      __dirname,
      `../../database/captures/${fileName}.perf`,
    );
    const outputPath: string = path.resolve(
      __dirname,
      `../../database/folded/${fileName}.folded`,
    );
    const script: string = path.resolve(
      __dirname,
      '../../src/perlScripts/stackCollapse-perf.pl',
    );
    // run the child_process to spawn a shell and execute the given
    // command that will execute .pl files
    try {
      const result = spawnSync(`${script} ${inputPath} > ${outputPath}`, { shell: true, timeout: 10000 });
      console.log(`${new Date().toLocaleString()}: Folded perf file ${JSON.stringify(result.status)}`);
      if (result.status === 0) return next();
      return next({
        userMessage: 'Error folding capture file',
        message: `stackCollapse-perf.pl ended with non-zero exit code: ${result.status || 'unknown'}`,
        controller: 'FlamegraphController',
      });
    } catch (error) {
      return next({
        userMessage: 'Error folding capture file',
        message: JSON.stringify(error),
        controller: 'FlamegraphController',
      });
    }
  },

  toSVG: (_req: Request, res: Response, next: NextFunction): void => {
    const fileName = Number(res.locals.id);
    const inputPath: string = path.resolve(
      __dirname,
      `../../database/folded/${fileName}.folded`,
    );
    const outputPath: string = path.resolve(
      __dirname,
      `../../database/SVGs/${fileName}.svg`,
    );
    const script: string = path.resolve(
      __dirname,
      '../../src/perlScripts/flamegraph.pl',
    );

    try {
      const result = spawnSync(`${script} ${inputPath} > ${outputPath}`, { shell: true, timeout: 10000 });
      console.log(result.stderr.toString());
      console.log(`${new Date().toLocaleString()}: Converted folded perf file ${JSON.stringify(result.status)}`);
      if (result.status === 0) return next();
      return next({
        userMessage: 'Error converting capture to SVG',
        message: `flamegraph.pl ended with non-zero exit code: ${result.status || 'unknown'}`,
        controller: 'FlamegraphController',
      });
    } catch (error) {
      return next({
        userMessage: 'Error converting capture to SVG',
        message: JSON.stringify(error),
        controller: 'FlamegraphController',
      });
    }
  },
};

export default flamegraphController;
