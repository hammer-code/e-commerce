var request = require('supertest');
var app = require('../../src/app');
var utils = require('../utils');

var url = utils.url;

describe('DELETE /api/products/:id', function () {
  it('should return 200 when product is deleted', function (done) {
    request(app)
      .delete(url('/products/product-1'))
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(200);
        expect(body.message).toBe('Product with ID `product-1` has successfully been deleted.');
        done();
      });
  });

  it('should return 404 when trying to delete non-existing product', function (done) {
    request(app)
      .delete(url('/products/product-100'))
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(404);
        expect(body.message).toBe('Product with ID `product-100` was not found.');
        done();
      });
  });
});
