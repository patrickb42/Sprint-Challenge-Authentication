const request = require('supertest');

const jokesRouter = require('../api/server');
const db = require('../database/dbConfig');

beforeEach(async () => {
  await db('users').truncate();
});


describe('jokesRouter', () => {
  describe('get request', () => {
    it('should return success status', async () => {
      const expectedStatusCode= 401;
      const response = await request(jokesRouter).get('/api/jokes');
      expect(response.status).toEqual(expectedStatusCode);
    })

    it('should return jokes', async () => {
      const jokesURL = { 'message': 'token not valid' };    
      const response= await request(jokesRouter).get('/api/jokes');
      expect(response.body).toEqual(jokesURL)
    })
  })
});
