
const request = require('supertest')
const app = require('../../src/App')

describe('Event Controller Tests', () => {

    test('Reset state before starting tests', () => {
      return request(app)
        .post('/reset')
        .expect(200, 'OK');
    })

    test('Get balance for non-existing account', () => {
        return request(app)
          .get('/balance')
          .query({ account_id: '1234' })
          .expect(404, '0');
    });  

})