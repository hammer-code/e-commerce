var request = require('supertest');
var app = require('../../../src/app');
var utils = require('../../utils');
var cart = require('../../../src/cart');
var cartRepo = require('../../../src/repo/cart');

var url = utils.url;

var persistedCart = null;

beforeAll(function () {
  var c = cart.create();

  persistedCart = cartRepo.persist(c);
});

describe('POST /api/carts/:id/line-items', function () {
  test('should return 200 when item is added', async function () {
    var payload = {
      item: {
        productId: 'product-1', // Its price is 20
        qty: 2,
      }
    };

    var URL = url('/carts/' + persistedCart.id + '/line-items')

    await request(app)
      .post(URL)
      .send(payload)
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(200);
        expect(typeof body.cart.id).toBe('string');
        expect(Array.isArray(body.cart.lineItems)).toBe(true);
        expect(body.cart.lineItems.length).toBe(1);
        expect(body.cart.lineItems[0].name).toBe('YDKJS');
        expect(body.cart.lineItems[0].price).toBe(20);
        expect(body.cart.lineItems[0].qty).toBe(2);
        expect(body.total).toBe(40);
      });

    payload = {
      item: {
        productId: 'product-3', // Its price is 50
        qty: 3,
      }
    };

    await request(app)
      .post(URL)
      .send(payload)
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(200);
        expect(typeof body.cart.id).toBe('string');
        expect(Array.isArray(body.cart.lineItems)).toBe(true);
        expect(body.cart.lineItems.length).toBe(2);
        expect(body.cart.lineItems[1].name).toBe('Effective Engineer');
        expect(body.cart.lineItems[1].price).toBe(50);
        expect(body.cart.lineItems[1].qty).toBe(3);
        expect(body.total).toBe(40 + 150);
      });

      payload = {
        item: {
          productId: 'product-3', // Its price is 50
          qty: 3,
        }
      };

      await request(app)
        .post(URL)
        .send(payload)
        .expect('Content-Type', /json/)
        .then(function (response) {
          var body = response.body;

          expect(response.status).toBe(200);
          expect(typeof body.cart.id).toBe('string');
          expect(Array.isArray(body.cart.lineItems)).toBe(true);
          expect(body.cart.lineItems.length).toBe(2);
          expect(body.cart.lineItems[1].name).toBe('Effective Engineer');
          expect(body.cart.lineItems[1].price).toBe(50);
          expect(body.cart.lineItems[1].qty).toBe(6);
          expect(body.total).toBe(40 + 300);
        });
  });

  test('should return 404 when trying to add item into non-existent cart', async function () {
    var payload = {
      item: {
        productId: 'product-1', // Its price is 20
        qty: 2,
      }
    };

    var URL = url('/carts/dummy-id/line-items')

    await request(app)
      .post(URL)
      .send(payload)
      .expect('Content-Type', /json/)
      .then(function (response) {
        var body = response.body;

        expect(response.status).toBe(404);
        expect(body.message).toBe('Cart with ID `dummy-id` was not found');
      })
  });
});
