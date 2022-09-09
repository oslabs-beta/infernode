import { Request, Response, NextFunction } from 'express';
import fs from 'fs-extra';
import formidable from 'formidable';
import path from 'path';

export default class FileController {
  public uploadDir = '../../database/uploads';

  public captureDir = '../../database/captures';

  public svgDir = '../../database/SVGs';

  addData = (req: Request, res: Response, next: NextFunction) => {
    // Get next ID
    const fileId = Number(res.locals.id);

    const processTempFile = (formName: string, file: formidable.File) => {
      console.log(`fileController.addData() processing ${formName} file: ${file.originalFilename || 'unknown'}`);
      const filePath: string = file.filepath;
      const currentPath = filePath;
      const renamedPath = path.resolve(
        __dirname,
        this.uploadDir,
        `${fileId}.perf`,
      );
      const destinationPath = path.resolve(
        __dirname,
        this.captureDir,
        `${fileId}.perf`,
      );

      try {
        fs.renameSync(currentPath, renamedPath);
        console.log('Data File successfully renamed with Id');
        fs.moveSync(renamedPath, destinationPath);
        console.log('Data File successfully moved from uploads to captures');
        return next();
      } catch (err) {
        return next(err);
      }
    };
    console.log('Invoked fileController.addData');
    console.log(req.body);
    const uploads = new formidable.IncomingForm({
      uploadDir: path.resolve(__dirname, '../../database/uploads/'),
      maxFileSize: 1024 * 1024 * 1240,
    });
    uploads.on('file', (fieldName: string, file: formidable.File) => {
      console.log(`fileController.addData() recv'd ${fieldName} file: ${file.originalFilename || 'unknown'}`);
      processTempFile(fieldName, file);
    });
    uploads.on('field', (fieldName: string, field: string) => {
      console.log(`fileController.addData() recv'd ${fieldName} value: ${field || 'unknown'}`);
    });

    uploads.parse(req);
  };

  deliverSVG = (req: Request, res: Response, next: NextFunction) => {
    console.log('Invoked deliverSVG');
    const fileId = req.params.id;
    console.log(fileId);
    const fileName = path.resolve(
      __dirname,
      this.svgDir,
      `${fileId}.svg`,
    );

    res.sendFile(fileName, (err) => {
      if (err) {
        next(err);
      }
    });
  };
}
