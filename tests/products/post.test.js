var request = require('supertest');
var app = require('../../src/app');
var utils = require('../utils');

var url = utils.url;

describe('POST /api/products', function () {
  it('should return 201 when product is created', function (done) {
    var payload = {
      name: 'Functional Light JS',
      price: 25,
      description: 'Lorem ipsum.',
    };
    request(app)
      .post(url('/products'))
      .send(payload)
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(201);
        expect(body.product.name).toBe('Functional Light JS');
        expect(body.product.price).toBe(25);
        expect(body.product.description).toBe('Lorem ipsum.');
        done();
      });
  });
});
