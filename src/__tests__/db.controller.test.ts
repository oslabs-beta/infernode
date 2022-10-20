import {Request, Response, NextFunction} from 'express';

import dbControllerInstance from '../controllers/db.controller'
import captureDB from '../models/captureModel';

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

xdescribe('db controller unit tests', () => {
  //run the function
  const dbTest = dbControllerInstance
  //create a new instance of the db
  // dbTest.createEmptyRecord(mockRequest as Request, mockResponse as Response, nextFunction)

  xit('saves the uploaded document to the local DB', async () => {
    //query the db to see if it exists
    const data = await captureDB.all(`SELECT * FROM capture`, (err, rows: typeof dataModel[]) => {
      expect(rows[0].id).toEqual(0) 
    })
  })
  xit('creates a db entry with the correct format', async () => {
    const data = await captureDB.all(`SELECT * FROM capture`, (err, rows: typeof dataModel[]) => {
      // expect(rows[0]).toBeInstanceOf(dataModel) 
      expect(rows[0]).toMatchObject(dataModel)
    })
  })
})