import { doesNotReject } from 'assert'
import request from 'supertest'
// import fs from 'fs'

const server = 'http://localhost:3000'
// const server2 = 'http://localhost:8080'

// please see ref docs: https://jestjs.io/docs/asynchronous

describe('Route Integration testing', () => {

  describe('GET to root', () => {
    it('responds with 200 status and text/html content', () => {
      return request(server)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200)
    })
  })

  describe('/api integration testing', () => {
    xdescribe('GET', () => {
      it('responds with 200 status and text/html content', () => {
        return request(server)
          .get('/api')
          .expect('Content-Type', /text\/html/)
          .expect(200)
      })
    })
    xdescribe('POST', () => {
      it('responds with 200 status and application/json content', () => {
        return request(server)
          .post('/api')
          .expect('Content-Type', /application\/json/)
          .expect(200)
      })
    })
    xdescribe('PUT', () => {
      it('responds with 200 status and application/json content', () => {
        return request(server)
          .put('/api')
          .expect('Content-Type', /application\/json/)
          .expect(200)
      })
    })
    xdescribe('PATCH', () => {
      it('responds with 200 status and application/json content', () => {
        return request(server)
          .patch('/api')
          .expect('Content-Type', /application\/json/)
          .expect(200)
      })
    })

  })

  describe('/api/captures integration testing', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content', () => {
        return request(server)
          .get('/api/captures')
          .expect('Content-Type', /application\/json/)
          .expect(200)
      })
    })
    xdescribe('POST', () => {
      // jest.setTimeout(15000)
      it('responds with 200 status and application/json content', async () => {
        return await request(server)
          .post('/api/captures')
          .expect('Content-Type', /application\/json/)
          .expect(200)
          
      })
    })
    xdescribe('PUT', () => {
      it('responds with 200 status and text/html content', () => {
        return request(server)
          .put('/api/captures')
          .expect('Content-Type', /text\/html/)
          .expect(200)
      })
    })
    xdescribe('PATCH', () => {
      it('responds with 200 status and text/html content', () => {
        return request(server)
          .patch('/api/captures')
          .expect('Content-Type', /text\/html/)
          .expect(200)
      })
    })
  })
})