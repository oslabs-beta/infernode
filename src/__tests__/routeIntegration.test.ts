import request from 'supertest'
import done from 'supertest'
// import fs from 'fs'

const port = Number(process.env.EXPRESS_PORT) || 8378;
const server = `http://localhost:${port}`;
// const server = 'http://localhost:3000'
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

  xdescribe('/api/app integration testing', () => {
    describe('POST to /start', () => {
      it('responds with 200 status and text/html content', () => {
        return request(server)
          .post('/api/app/start')
          .expect('Content-Type', /text\/html/)
          .expect(200)
          .end((err, res) => {
            if (err) console.log(res, err)
            // done(err)
          })
      })
    })
    describe('POST to /stop', () => {
      it('responds with 200 status and text/html content', () => {
        return request(server)
          .post('/api/app/stop')
          .expect('Content-Type', /text\/html/)
          .expect(200)
      })
    })
    describe('POST to /status', () => {
      it('responds with 200 status and text/html content', () => {
        return request(server)
          .post('/api/app/status')
          .expect('Content-Type', /text\/html/)
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