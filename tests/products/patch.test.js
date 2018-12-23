var request = require('supertest');
var app = require('../../src/app');
var utils = require('../utils');

var url = utils.url;

describe('PATCH /api/products/:id', function () {
  it('should return 200 when product is updated', async function () {
    var payload = {
      name: 'Updated title',
      price: 55,
      description: 'Howdy.',
    };

    await request(app)
      .patch(url('/products/product-1'))
      .send(payload)
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(200);
        expect(body.product.name).toBe('Updated title');
        expect(body.product.price).toBe(55);
        expect(body.product.description).toBe('Howdy.');
      });

    // Update only its title
    await request(app)
      .patch(url('/products/product-1'))
      .send({
        name: 'New updated title',
      })
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(200);
        expect(body.product.name).toBe('New updated title');
        expect(body.product.price).toBe(55);
        expect(body.product.description).toBe('Howdy.');
      });

    // Update only its price
    await request(app)
      .patch(url('/products/product-1'))
      .send({
        price: 20,
      })
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(200);
        expect(body.product.name).toBe('New updated title');
        expect(body.product.price).toBe(20);
        expect(body.product.description).toBe('Howdy.');
      });

    // Update only its price
    await request(app)
      .patch(url('/products/product-1'))
      .send({
        description: 'Hello there.',
      })
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(200);
        expect(body.product.name).toBe('New updated title');
        expect(body.product.price).toBe(20);
        expect(body.product.description).toBe('Hello there.');
      });
  });

  it('should return 404 when trying to update non-existing product', function (done) {
    var payload = {
      name: 'Updated title',
      price: 55,
      description: 'Howdy.',
    };

    request(app)
      .patch(url('/products/product-100'))
      .send(payload)
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(404);
        expect(body.message).toBe('Product with ID `product-100` was not found.');
        done();
      });
  });
});
