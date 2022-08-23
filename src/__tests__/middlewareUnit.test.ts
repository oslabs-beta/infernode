import {Request, Response, NextFunction} from 'express';
import fs from 'fs';
import { readFile } from 'fs'
import path from 'path';
import flamegraph from '../controllers/flamegraphController'

describe('Flamegraph controller test', () => {

  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let nextFunction: NextFunction = jest.fn();

  // ** IF TESTS ARE FAILING WHEN THEY SHOULD BE PASSING, CHECK THIS FIRST:
  // *****this number must match the test file that is saved in the db *******
  const num = 12345
  // ***** the test file must be a valid .perf capture *********
  // EXAMPLE: 12345.perf is in /data/captures, so num is 12345
  mockResponse = { locals: { id: num } }
  
  describe('stack Collapse middleware', () => {
    
    flamegraph.stackCollapse(mockRequest as Request, mockResponse as Response, nextFunction)
    
    it('creates a correctly named .folded file, in /folded', async () => {
      const test = await fs.existsSync(path.resolve(__dirname, `../../database/folded/${num}.folded`))
      expect(test).toBeTruthy();
    });

    xit('creates a .folded file that is not empty', async () => {
      const test = await fs.readFile(path.resolve(__dirname, `../..database/folded/${num}.folded`), (err, data) => {
        console.log(data)
       })
      console.log(`test is ${test}`)
      expect(test).toBeTruthy()
    });
  });

  describe('toSVG middleware', () => {
    
    flamegraph.toSVG(mockRequest as Request, mockResponse as Response, nextFunction)

    it('creates a correctly named SVG file in /SVGs', async () => {
      const test = await fs.existsSync(path.resolve(__dirname, `../../database/SVGs/${num}.svg`))
      expect(test).toBeTruthy();
    })

  });
});
