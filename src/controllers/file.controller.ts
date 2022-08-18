import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { readFileSync, writeFileSync, promises as fsPromises } from 'fs';

export default class FileController {
  constructor() {}
  addData = async (req: Request, res: Response, next: NextFunction) => {
    console.table(req.body);
    const profiledData: string = String(req.body);
    const fileId: number = res.locals.id;
    /**
     * flags:
     *  - w = Open file for reading and writing. File is created if not exists
     *  - a+ = Open file for reading and appending. The file is created if not exists
     */
    try {
      // await writing the new file, first argument is file location, second argument is data used to populate the new file
      await fsPromises.writeFile(
        join(__dirname, '../../database/captures/', `${fileId}`),
        profiledData,
        {
          flag: 'w',
        }
      );
      return next();
    } catch (err) {
      //do error handler things
      console.log(err);
      return next({
        message: 'Error in the FileController.addData middleware',
      });
    }
  };
}

//database/captures and /database/svgs

