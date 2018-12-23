var request = require('supertest');
var app = require('../../src/app');
var utils = require('../utils');

var url = utils.url;

describe('POST /api/carts', function () {
  it('should return 201 when cart is created', function (done) {
    request(app)
      .post(url('/carts'))
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(201);
        expect(typeof body.cart.id).toBe('string');
        expect(Array.isArray(body.cart.lineItems)).toBe(true);
        expect(body.cart.lineItems.length).toBe(0);
        done();
      })
  });
});
