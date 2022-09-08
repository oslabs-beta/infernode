import {Request, Response, NextFunction} from 'express';
import fs from 'fs';
import path from 'path';

import flamegraph from '../controllers/flamegraphController'
import dbControllerInstance from '../controllers/db.controller'
import captureDB from '../models/captureModel';
import logger from '../utils/logging';

// please see official docs for reference: https://jestjs.io/docs/using-matchers

let mockRequest: Partial<Request>
let mockResponse: Partial<Response>
let nextFunction: NextFunction = jest.fn();

const dataModel = {
  id: 0,
  capture_name: 'unspecified',
  // date: Date(),
  creator: 'unspecified',
  app_name: 'unspecified',
  data: 'flamegraph' || 'differentials' || 'icicle',
}
  // lets change this once we know what type it will be
  // constructor() {
  //   this.id = 0;
  //   this.capture_name = 'unspecified'
  //   this.date = new Date()
  //   this.creator = 'unspecified'
  //   this.app_name = 'unspecified'
  //   this.data = 'unspecified'
  // }


describe('Flamegraph generating controller test: requires valid .perf in db', () => {
  // ** IF TESTS ARE FAILING WHEN THEY SHOULD BE PASSING, CHECK THIS FIRST:
  // *****this number must match the test file that is saved in the db *******
  const num = 123
  // ***** the test file must be a valid .perf capture *********
  // EXAMPLE: 12345.perf is in /data/captures, so num is 12345
  mockRequest = { params: { flamegraph: 'flamegraph' } }
  mockResponse = { locals: { id: num } }

  describe('db controller tests', () => {
    //run the function
    const dbTest = dbControllerInstance
    //create a new instance of the db
    dbTest.createEmptyRecord(mockRequest as Request, mockResponse as Response, nextFunction)

    it('saves the uploaded document to the local DB', async () => {
      //query the db to see if it exists
      const data = await captureDB.all(`SELECT * FROM capture`, (err, rows: typeof dataModel[]) => {
        expect(rows[0].id).toEqual(0) 
      })
    })
    it('creates a db entry with the correct format', async () => {
      const data = await captureDB.all(`SELECT * FROM capture`, (err, rows: typeof dataModel[]) => {
        // expect(rows[0]).toBeInstanceOf(dataModel) 
        expect(rows[0]).toMatchObject(dataModel)
      })
    })
  })

  describe('file controller tests', () => {
    // run the function
    // fileController.addData(mockRequest as Request, mockResponse as Response, nextFunction)
  
    xit('adds the uploaded file to the database', async () => {
      // const test = await 
    })
  })
  
  describe('stack Collapse middleware', () => {
    //run the function
    flamegraph.stackCollapse(mockRequest as Request, mockResponse as Response, nextFunction)
    
    it('creates a correctly named .folded file, in /folded', async () => {
      const test = await fs.existsSync(path.resolve(__dirname, `../../database/folded/${num}.folded`))
      expect(test).toBeTruthy();
    });

    xit('creates a .folded file that is not empty', async () => {
      const test = await fs.readFile(path.resolve(__dirname, `../..database/folded/${num}.folded`), (err, data) => {
        logger.debug(data)
      })
      logger.debug(`test is ${test}`)
      expect(test).toBeTruthy()
    });
  });

  describe('toSVG middleware', () => {
    // run the function
    flamegraph.toSVG(mockRequest as Request, mockResponse as Response, nextFunction)

    it('creates a correctly named SVG file in /SVGs', async () => {
      const test = await fs.existsSync(path.resolve(__dirname, `../../database/SVGs/${num}.svg`))
      expect(test).toBeTruthy();
    })
  });
});


