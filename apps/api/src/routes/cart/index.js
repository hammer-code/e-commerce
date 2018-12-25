var express = require('express');
var cart = require('../../cart');
var cartRepo = require('../../repo/cart');
var lineItem = require('./line-item');

var router = express.Router();

// Todo: Add endpoint test
router.get('/:id', function (request, response) {
  var cartId = request.params.id;
  var c = cartRepo.findById(cartId);

  if (!c) {
    return response.status(404).json({
      message: 'Cart with ID `' + cartId + '` was not found.',
    });
  }

  response.status(200).json({
    cart: c,
    total: cart.total(c),
  });
});

router.post('/', function (request, response) {
  var c = cart.create();

  cartRepo.persist(c);

  response.status(201).json({
    cart: c,
  });
});

router.use('/:id/line-items', lineItem);

module.exports = router;
