
const request = require('supertest')
const app = require("../../src/App")

describe("Event Controller Tests", () => {

    test("Reset state before starting tests", () => {
      return request(app)
        .post("/reset")
        .expect(200, 'OK');
    })

})