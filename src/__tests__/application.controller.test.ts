import {Request, Response, NextFunction} from 'express';
import path from 'path';
import applicationController from '../controllers/application.controller'
import logger from '../utils/logging';

let mockRequest: Partial<Request> = { body: { filePath: '/src/examples/app-test.js' }}
let mockResponse: Partial<Response> = { locals: { pid: null}}
let nextFunction: NextFunction = jest.fn();
let pid: number

describe('Application controller tests', () => {
    
  it('launches an executable Node application', async () => {
    await applicationController.nodeLaunch(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.locals).toHaveProperty('pid')
    expect((mockResponse: any) => {
      let test = typeof mockResponse.locals.pid;
      test = "number";
      pid = mockResponse.locals.pid
    })
  })
  
  it('successfully checks the status of the launched application', async () => {
    mockRequest = { body: { pid: pid } }
    applicationController.getStatus(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse).toBe(true)
  })

  xit('successfully kills the launched application', async () => {
    // applicationController.nodeKill
  })
  

})