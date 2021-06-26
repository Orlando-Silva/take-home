
const request = require('supertest')
const app = require('../../src/App')

describe('Deposit Event Tests', () => {
    test('Create account with initial balance', () => {
      return request(app)
        .post('/event')
        .send({
          type: 'deposit', 
          destination: '100', 
          amount: 10
        })
        .expect(201, {
          destination: {
            id: '100', 
            balance: 10
          }
        });
    });

    test('Deposit into existing account', () => {
      request(app)
        .post('/event')
        .send({
          type: 'deposit', 
          destination: '100', 
          amount: 10
        })
      return request(app)
        .post('/event')
        .send({
          type: 'deposit', 
          destination: '100', 
          amount: 10
        })
        .expect(201, {
          destination: {
            id: '100', 
            balance: 20
          }
        });
    });
})

describe('Get Balance Tests', () => {

  test('Get balance for non-existing account', () => {
      return request(app)
        .get('/balance')
        .query({ account_id: '1234' })
        .expect(404, '0');
  })

  test('Get balance for existing account', () => {
    request(app)
      .post('/event')
      .send({
        type: 'deposit', 
        origin: '100', 
        amount: 20
      })
      .expect(201, {
        origin: {
          id: '100', 
          balance: 20
        }
    });
    return request(app)
      .get('/balance')
      .query({ account_id: '100' })
      .expect(200, '20');
  });

  test('Withdraw from non-existing account', () => {
    return request(app)
      .post('/event')
      .send({
        type: 'withdraw', 
        origin: '200', 
        amount: 10
      })
      .expect(404, '0');
  });

  test('Withdraw from existing account', () => {
    request(app)
      .post('/event')
      .send({
        type: 'deposit', 
        destination: '100', 
        amount: 20
      })
      .expect(201, {
        destination: {
          id: '100', 
          balance: 20
        }
    });
    return request(app)
      .post('/event')
      .send({
        type: 'withdraw', 
        origin: '100', 
        amount: 5
      })
      .expect(201, {
        origin: {
          id: '100', 
          balance: 15
        }
    });
  });

})


describe('Reset Tests', () => {

  test('Reset state before starting tests', () => {
    return request(app)
      .post('/reset')
      .expect(200, 'OK');
  })

})