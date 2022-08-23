// import {Request, Response, NextFunction} from 'express';
import fs from 'fs';
import path from 'path';
// import { describe, expect, it, jest } from '@jest/globals';
//unit tests for the flamegraph generating middleware
//import middleware

const flamegraph = require('../controllers/flamegraphController');

describe('Flamegraph controller test', () => {
  describe('stack folder controller', () => {
    // two methods:  stackCollaspe, toSVG
    it('creates a .folded file with the correct name', () => {
      // create a Request, Response(with id), and NextFunction obj
      // pass to flamegraph.stackCollapse()

      // expect the output to have .folded extension
      // let mockRequest: Partial<Request>;
      // let mockResponse: Partial<Response>;
      const nextFunction = jest.fn();
      const mockRequest = {};
      const mockResponse = { locals: { id: '1' } };
      flamegraph.stackCollapse(mockRequest, mockResponse, nextFunction);
      expect(
        fs.existsSync(path.resolve(__dirname, '../..database/folded/1.folded'))
      ).toBeTruthy;
    });

    // xit('saves the file to /folded', () => {

    // });

    // xit('creates a file that is not empty', () => {

    // });
  });

  describe('toSVG controller', () => {});
});
