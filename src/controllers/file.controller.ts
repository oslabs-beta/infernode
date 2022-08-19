import { Request, Response, NextFunction } from 'express';
import fs from 'fs-extra';
import formidable from 'formidable';
import path from 'path';

export default class FileController {
  public uploadDir = '../../database/uploads';

  addData = (req: Request, res: Response, next: NextFunction) => {
    // Get next ID
    const fileId = Number(res.locals.id);

    const processTempFile = (formName: string, file: formidable.File) => {
      // console.log(
      //   `${new Date().toLocaleString()}: Parsed POST'd file, formname ${JSON.stringify(
      //     formName,
      //   )}, files ${JSON.stringify(file)}`,
      // );
      const filePath: string = file.filepath;
      const currentPath = filePath; // files.capture.filepath;
      const renamedPath = path.resolve(
        __dirname,
        this.uploadDir,
        `${fileId}.perf`,
      );
      const destinationPath = path.resolve(
        __dirname,
        this.uploadDir,
        `${fileId}.perf`,
      );

      try {
        fs.renameSync(currentPath, renamedPath);
        // console.log('Data File successfully renamed with Id');
        fs.moveSync(renamedPath, destinationPath);
        // console.log('Data File successfully moved from uploads to captures');
      } catch (err) {
        return next(err);
      }
      return next();
    };

    const uploads = new formidable.IncomingForm({
      uploadDir: path.resolve(__dirname, '../../database/uploads/'),
    });
    uploads.on('file', (fieldName: string, file: formidable.File) => {
      processTempFile(fieldName, file);
    });

    uploads.parse(req);
  };
}
