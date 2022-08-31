import { Request, Response, NextFunction } from 'express';
import { spawnSync } from 'child_process';
import path from 'path';

type IcicleControllerType = {
  toIcicleSVG: (req: Request, res: Response, next: NextFunction) => void
};

const icicleController: IcicleControllerType = {
  toIcicleSVG: (req: Request, res: Response, next: NextFunction) => {
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
      const result = spawnSync(`${script} --inverted --colors aqua ${inputPath} > ${outputPath}`, { shell: true, timeout: 10000 });
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

export default icicleController;
