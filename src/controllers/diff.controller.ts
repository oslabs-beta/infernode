import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { spawnSync } from 'child_process';
import logger from '../utils/logging';

// user has to create flamegraphs to have anything to compare
// so we can assume that the .folded files already exist in the db
// that we want to diff
// lets assume for now that the file id will arrive on req.body
// so we only need one function that will take the .folded
// stacks and diff them

type DiffControllerType = {
  flamegraphDiff: (req: Request, res: Response, next: NextFunction) => void
};

type ReqBody = {
  id1: number;
  id2: number;
};
// note reqBody and ReqBody are not the same thing
function isReqBody(reqBody: ReqBody | object): reqBody is ReqBody {
  const hasid1 = 'id1' in reqBody && typeof reqBody.id1 === 'number';
  const hasid2 = 'id2' in reqBody && typeof reqBody.id2 === 'number';
  if (hasid1 && hasid2) return true;
  return false;
}

const diffController: DiffControllerType = {
  flamegraphDiff: (req: Request, res: Response, next: NextFunction) => {
    const requestBody = req.body as ReqBody | object;
    if (!isReqBody(requestBody)) {
      return next({
        userMessage: 'invalid file type entry',
        message: 'please check the id submitted',
        controller: 'diffController',
      });
    }
    try {
      const { id1, id2 } = requestBody;
      // first retrieve the folded stack traces to compare
      // note these filepaths are relative from the /dist folder since
      // that is where the .js compiled copies are being run
      const id = Number(res.locals.id);
      const file1: string = path.resolve(__dirname, `../../database/folded/${id1}.folded`);
      const file2: string = path.resolve(__dirname, `../../database/folded/${id2}.folded`);
      const diffPathPl: string = path.resolve(__dirname, '../assets/perlScripts/diff-folded.pl');
      const flamePathPl: string = path.resolve(__dirname, '../assets/perlScripts/flamegraph.pl');
      const output: string = path.resolve(__dirname, `../../database/SVGs/${id}.svg`);
      res.locals.diffID = Number(id);
      const result = spawnSync(`${diffPathPl} ${file1} ${file2} | ${flamePathPl} > ${output}`, { shell: true });
      logger.debug(`diffed folded files ${JSON.stringify(result.status)}`);
      if (result.status === 0) return next();
      return next({
        userMessage: 'Error diffing folded files',
        message: `diff-folded.pl or flamegraph.pl ended with non-zero exit code: ${result.status || 'unknown'}`,
        controller: 'diffController',
      });
    } catch (err) {
      return next({
        userMessage: 'Error diffing folded files',
        message: JSON.stringify(err),
        controller: 'diffController',
      });
    }
  },
};

export default diffController;
