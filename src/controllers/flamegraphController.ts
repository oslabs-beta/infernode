//middelware function that will take a .perf and return a .svg
/*
we will need to use commist and minimist to define the automated command line functions
we will need to import two .pl scripts from Gregg's repo

1. run the following command to collapse the stack frames
./stackcollapse-perf.pl out.perf > out.folded

2. run the following command to convert collapsed stack frames into .svg
./flamegraph.pl out.kern_folded > kernel.svg

3. return the .svg to the next middleware function
*/
// const execSync = require('child_process').execSync

// exec() method: This method creates a shell first and then executes the command. 
const exec = require('child_process').exec   
// const minimist = require('minimist')
// const commist = require('commist')
import { Express, Request, Response, NextFunction } from 'express'
// import * as child from 'child_process'
// import * as events  from 'events'
import * as stream from 'stream'

const express = require('express');
const app = express();

type FlamegraphSVGController = {
  //collapse the stack traces in the perf:
  stackCollapse: (req: Request, res: Response, next: NextFunction) => void, 
  //convert the collapsed stack traces into an SVG:
  toSVG: (req: Request, res: Response, next: NextFunction) => void, 
}


const flamegraphController: FlamegraphSVGController = {
  stackCollapse: (req: Request, res: Response, next: NextFunction): void => {
    //node child process
    // const fileName = parseInt(res.locals.id); 
    const fileName = '1';
    exec(`./src/perlScripts/stackCollapse-perf.pl ./database/captures/1.perf > ./database/captures/folded/1.folded`,
       (error: stream.Readable, stdout: stream.Readable, stderr: stream.Readable) => {
        //change to String | Buffer if it doesnt work
        //  console.log(`stdout: ${stdout}`)
        if (error) {
          //   return next({
          //     log: 'something went wrong with the stackFolder middleware',
          //     message: { err: error },
          //   });
          console.log('err in stackCollapse');
          return res.status(500).json('stackFolder err-----');
        }
        return next();
      })
  },

  toSVG: (req: Request, res: Response, next: NextFunction): void => {
    // const fileName = res.locals.id;
    const fileName = '1';
    exec(`./src/perlScripts/flamegraph.pl ./database/captures/folded/1.folded > ./database/captures/SVGs/1.svg`,
      (error: Error, stdout: string | Buffer, stderr: string | Buffer) => {
      //store file ./database/SVGs
      if (!error) return next();
      else return res.status(500).json('toSVG err-----');
      // return next({
      //   log: 'i am lost-------',
      //   message: 'Error in toSVG controller'
      // });
      
    })
  }
}

// temperaty testing of functiosn
app.get('/', (req: Request, res: Response): Object => res.json('test the server..'))

app.get('/test',
  flamegraphController.stackCollapse,
  flamegraphController.toSVG,
  (req: Request, res: Response): Object => {
  return res.status(200).json('test fg controllers sucessfull-----');
})

app.listen('3000', (err:Error) => {if (err) console.log(err); else console.log('server is listening....at 3000')})


module.exports = flamegraphController;
