//middelware function that will take a .perf and return a .svg
/*
1. run the following command to collapse the stack frames
./stackcollapse-perf.pl out.perf > out.folded

2. run the following command to convert collapsed stack frames into .svg
./flamegraph.pl out.kern_folded > kernel.svg

3. return the .svg to the next middleware function
*/

// exec() method: This method creates a shell first and then executes the command. 
const exec = require('child_process').exec   
import { Express, Request, Response, NextFunction } from 'express'
import * as stream from 'stream'

const path = require('path')

type FlamegraphSVGController = {
  //collapse the stack traces in the perf:
  stackCollapse: (req: Request, res: Response, next: NextFunction) => void, 
  //convert the collapsed stack traces into an SVG:
  toSVG: (req: Request, res: Response, next: NextFunction) => void
}

const flamegraphController: FlamegraphSVGController = {
  stackCollapse: (req: Request, res: Response, next: NextFunction): void => {
    //node child process
    console.log('---dirname---', __dirname); // ...src/controllers/flamegraphcontroller.ts
    const fileName: string = res.locals.id; 
    const inputPath: string = path.resolve(__dirname, `../../database/captures/${fileName}.perf`)
    const outputPath: string = path.resolve(__dirname, `../../database/folded/${fileName}.folded`)
    const script: string = path.resolve(__dirname, `../../src/perlScripts/stackCollapse-perf.pl`)

    exec(`${script} ${inputPath} > ${outputPath}`,
       (error: Error, stdout: stream.Readable, stderr: stream.Readable) => {
        //change to String | Buffer if it doesnt work
        if (error) {
            return next({
              message: 'something went wrong with the stackFolder middleware',
              userMessage: error.message,
              controller: 'FlamegraphController'
            });
          // console.log('err in stackCollapse');
          // return res.status(500).json('stackFolder err-----');
        }
        return next();
      })
  },

  toSVG: (req: Request, res: Response, next: NextFunction): void => {
    
    const fileName = res.locals.id;
    const inputPath: string = path.resolve(__dirname, `../../database/folded/${fileName}.folded`)
    const outputPath: string = path.resolve(__dirname, `../../database/SVGs/${fileName}.svg`)
    const script: string = path.resolve(__dirname, `../../src/perlScripts/flamegraph.pl`);
    
    exec(`${script} ${inputPath} > ${outputPath}`,
      (error: Error, stdout: string | Buffer, stderr: string | Buffer) => {
      //store file ./database/SVGs
      if (!error) return next();
      else 
      // return res.status(500).json('toSVG err-----');
      return next({
        message: 'something went wrong with the toSVG middleware',
        userMessage: error.message,
        controller: 'FlamegraphController'
      });
      
    })
  }
}

module.exports = flamegraphController;
