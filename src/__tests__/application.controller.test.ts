import {Request, Response, NextFunction} from 'express';
import request from 'supertest';
import path from 'path';
import applicationController from '../controllers/application.controller'
import logger from '../utils/logging';

const port = Number(process.env.EXPRESS_PORT) || 8378;
const server = `http://localhost:${port}`;

describe('Application controller unit tests', () => {

  let mockRequest: Partial<Request> = { body: { filePath: '/src/examples/app-test.js' }}
  let mockResponse: Partial<Response> = { locals: { pid: null}}
  let nextFunction: NextFunction = jest.fn();
  let pid: number
  
  it('launches an executable Node application', async () => {
    await applicationController.nodeLaunch(mockRequest as Request, mockResponse as Response, nextFunction)
    expect(mockResponse.locals).toHaveProperty('pid')
    expect((mockResponse: any) => {
      let test = typeof mockResponse.locals.pid;
      test = "number";
      pid = mockResponse.locals.pid
      expect(mockResponse.locals.pid).toBe(false)
    })
  })
})


describe('/api/app/... integration tests', () => {
  let pid: number = 0 //this is needed across all tests

  describe('POST request to /api/app/start', () => {
    const req = { filePath: '/src/examples/app-test.js' }
    const Response = { text: Number }
    
    it('launches an application and returns a pid', async () => {
      return await request(server)
      .post('/api/app/start')
      .send(req)
      .expect('Content-Type', /application\/json/)
      // .expect('Content-Type', /text\/html/)
      .expect(200)
        .expect(response => {
          console.log(response.text)
          expect(typeof response.text).toBe('string')
          pid = Number(response.text)
        })
    })
  })

  describe('POST request to /api/app/status', () => {
    it('checks that the application was launched and returns true', async () => {
      return await request(server)
      .post('/api/app/status')
      .send({ pid: pid })
      .expect('Content-Type', /application\/json/)
      .expect(200)
        .expect(response => {
          expect(response.text).toBe('true')
        })
    })
  })

  describe('POST request to /api/app/stop', () => {
    it('kills the launched application', async () => {
      return await request(server)
      .post('/api/app/stop')
      .send({ pid: pid })
      .expect('Content-Type', /text\/html/)
      .expect(200)
        .expect(response => {
          // console.log(response)
          expect(response.text).toBe('Congrats! Your child process was successfully killed')
        })
    })
  })

  describe('second POST request to /api/app/status', () => {
    it('checks that the application was actually killed', async () => {
      return await request(server)
      .post('/api/app/status')
      .send({ pid: pid })
      .expect('Content-Type', /application\/json/)
      .expect(200)
        .expect(response => {
          expect(response.text).toBe('false')
        })
    })
  })
})