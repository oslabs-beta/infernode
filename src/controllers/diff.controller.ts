import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { spawnSync } from 'child_process';

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

function isReqBody(reqBody: ReqBody | object): reqBody is ReqBody {
  const hasid1 = 'id1' in reqBody && typeof reqBody.id1 === 'number';
  const hasid2 = 'id2' in reqBody && typeof reqBody.id2 === 'number';
  if (hasid1 && hasid2) return true;
  return false;
}


const diffController: DiffControllerType = {
  flamegraphDiff: (_req: Request, res: Response, next: NextFunction) => {
    const requestBody = _req.body as ReqBody | object;
    if (!isReqBody(requestBody)) {
      return next({
        userMessage: 'invalid file type entry',
        message: 'please check the id submitted',
        controller: 'diffController',
      });
    }
    try {
      const { id1, id2 } = req.body;
      // first retrieve the folded stack traces to compare
      const file1: string = path.resolve(__dirname, `../../database/folded/${id1}.folded`);
      const file2: string = path.resolve(__dirname, `../../database/folded/${id2}.folded`);
      const diffPathPl: string = path.resolve(__dirname, '../perlScripts/diff-folded.pl');
      const flamePathPl: string = path.resolve(__dirname, '../perlScripts/flamegraph.pl');
      const output: string = path.resolve(__dirname, `../../database/SVGs/diff${id2}-${id1}`);

      const result = spawnSync(`${diffPathPl} ${file1} ${file2} | ${flamePathPl} > ${output}`);
      console.log(`${new Date().toLocaleString()}: diffed folded files ${JSON.stringify(result.status)}`);
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
