const request = require('supertest');
const dotenv = require('dotenv');

dotenv.config();

/* If the environment variable EXPRESS_PORT is set, use that port, otherwise use 8378. */
const port = Number(process.env.EXPRESS_PORT) || 8378;
const server = `http://localhost:${port}`;

describe('Health Checks', () => {

  describe('/health', () => {

    it('responds with a 200 status', () => {
      return request(server).get('/health').expect(200);
    })
  })

  describe('/health/started', () => {
    it('responds with a 200 status', () => {
      return request(server).get('/health/started').expect(200);
    })
  })

  describe('/health/live', () => {
    it('responds with a 200 status', () => {
      return request(server).get('/health/live').expect(200);
    })
  })

  describe('/health/ready', () => {
    it('responds with a 200 status', () => {
      return request(server).get('/health/ready').expect(200);
    })
  })
})