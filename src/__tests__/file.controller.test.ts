import {Request, Response, NextFunction} from 'express';
import fs from 'fs';
import path from 'path';

import flamegraph from '../controllers/flamegraphController'
import FileController from '../controllers/file.controller'
import captureDB from '../models/captureModel';
import logger from '../utils/logging';
import { request } from 'http';

// please see official docs for reference: https://jestjs.io/docs/using-matchers

let mockRequest: Partial<Request>
let mockResponse: Partial<Response>
let nextFunction: NextFunction = jest.fn();

const port = Number(process.env.EXPRESS_PORT) || 8378;
const server = `http://localhost:${port}`;

const dataModel = {
  id: 0,
  capture_name: 'unspecified',
  // date: Date(),
  creator: 'unspecified',
  app_name: 'unspecified',
  data: 'flamegraph' || 'differentials' || 'icicle',
}

describe('file controller unit tests', () => {
  // ** IF TESTS ARE FAILING WHEN THEY SHOULD BE PASSING, CHECK THIS FIRST:
  // *****this number must match the test file that is saved in the db *******
  const num = 123
  // ***** the test file must be a valid .perf capture *********
  // EXAMPLE: 12345.perf is in /data/captures, so num is 12345
  mockRequest = { params: { flamegraph: 'flamegraph' } }
  mockResponse = { locals: { id: num } }
  mockResponse = { locals: { id: num } }

  // run the function
  // fileController.addData(mockRequest as Request, mockResponse as Response, nextFunction)
  
  xit('adds the uploaded file to the database', async () => {
    // await FileController.addData(mockRequest as Request, mockResponse as Response, nextFunction)
  })

  xit('Retrieves an SVG from the database', async () => {
    // await FileController.deliverSVG(mockRequest as Request, mockResponse as Response, nextFunction)
  })
})
