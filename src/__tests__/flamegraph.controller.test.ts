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

describe('Flamegraph generating controller test: requires valid .perf in db', () => {
  // ** IF TESTS ARE FAILING WHEN THEY SHOULD BE PASSING, CHECK THIS FIRST:
  // *****this number must match the test file that is saved in the db *******
  const num = 123
  // ***** the test file must be a valid .perf capture *********
  // EXAMPLE: 12345.perf is in /data/captures, so num is 12345
  mockRequest = { params: { flamegraph: 'flamegraph' } }
  mockResponse = { locals: { id: num } }
  mockResponse = { locals: { id: num } }
  
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


