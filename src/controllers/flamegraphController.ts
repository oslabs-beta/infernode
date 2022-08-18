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

const express = require('express');
const app = express();

type FlamegraphSVGController = {
  //collapse the stack traces in the perf:
  stackCollapse: (req: Request, res: Response, next: NextFunction) => void, 
  //convert the collapsed stack traces into an SVG:
  toSVG: (req: Request, res: Response, next: NextFunction) => void
}

const flamegraphController: FlamegraphSVGController = {
  stackCollapse: (req: Request, res: Response, next: NextFunction): void => {
    //node child process
    const fileName = res.locals.id; 
    console.log(fileName, '-----')
    exec(`./src/perlScripts/stackCollapse-perf.pl ./database/captures/${fileName}.perf > ./database/folded/${fileName}.folded`,
       (error: stream.Readable, stdout: stream.Readable, stderr: stream.Readable) => {
        //change to String | Buffer if it doesnt work
        if (error) {
            return next({
              log: 'something went wrong with the stackFolder middleware',
              message: { err: error },
            });
          // console.log('err in stackCollapse');
          // return res.status(500).json('stackFolder err-----');
        }
        return next();
      })
  },

  toSVG: (req: Request, res: Response, next: NextFunction): void => {
    const fileName = res.locals.id;
    console.log(fileName, '-----')
    exec(`./src/perlScripts/flamegraph.pl ./database/folded/${fileName}.folded > ./database/SVGs/${fileName}.svg`,
      (error: Error, stdout: string | Buffer, stderr: string | Buffer) => {
      //store file ./database/SVGs
      if (!error) return next();
      else 
      // return res.status(500).json('toSVG err-----');
      return next({
        log: 'something went wrong with the toSVG middleware',
        message: {err: error}
      });
      
    })
  }
}

// temperaty testing of functiosn, will remove
// app.get('/', (req: Request, res: Response): Object => res.json('test the server..'))

// app.get('/test',
//   flamegraphController.stackCollapse,
//   flamegraphController.toSVG,
//   (req: Request, res: Response): Object => {
//   return res.status(200).json('test fg controllers sucessfull-----');
// })

// app.listen('3000', (err:Error) => {if (err) console.log(err); else console.log('server is listening....at 3000')})


module.exports = flamegraphController;
