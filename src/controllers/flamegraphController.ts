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

import { exec } from 'child_process';

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
  stackCollapse: (req: Request, res: Response, next: NextFunction): void => {
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
    exec(
      `${script} ${inputPath} > ${outputPath}`,
      (error: Error | null, stdout: string | Buffer, stderr: string | Buffer) => {
        if (error) {
          return next({
            message: 'something went wrong with the stackFolder middleware',
            userMessage: error.message,
            controller: 'FlamegraphController',
          });
          // console.log('err in stackCollapse');
          // return res.status(500).json('stackFolder err-----');
        }
        return next();
      },
    );
  },

  toSVG: (req: Request, res: Response, next: NextFunction): void => {
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

    exec(
      `${script} ${inputPath} > ${outputPath}`,
      (error: Error | null, stdout: string | Buffer, stderr: string | Buffer) => {
        // store file ./database/SVGs
        if (!error) return next();
        return next({
          message: 'something went wrong with the toSVG middleware',
          userMessage: error.message,
          controller: 'FlamegraphController',
        });
      },
    );
  },
};

export default flamegraphController;
