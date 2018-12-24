var request = require('supertest');
var app = require('../../src/app');
var utils = require('../utils');

var url = utils.url;

describe('GET /api/products', function () {
  it('should return 200', function (done) {
    request(app)
      .get(url('/products'))
      .expect('Content-Type', /json/)
      .then(function (response) {
        expect(response.status).toBe(200);

        done();
      });
  });
});

describe('GET /api/products/:id', function () {
  it('should return 200 when product is found', function (done) {
    request(app)
      .get(url('/products/product-1'))
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(200);
        expect(body.product.id).toBe('product-1');
        expect(body.product.name).toBe('YDKJS');
        expect(body.product.price).toBe(20);
        done();
      });
  });

  it('should return 404 when product is not found', function (done) {
    request(app)
      .get(url('/products/product-100'))
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(404);
        expect(body.message).toBe('Product with ID: `product-100` was not found');
        done();
      });
  });
});
