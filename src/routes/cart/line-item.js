var express = require('express');
var cart = require('../../cart');
var productRepo = require('../../repo/product');
var cartRepo = require('../../repo/cart');

var router = express.Router({ mergeParams: true });

router.post('/', function (request, response) {
  var cartId = request.params.id;

  var c = cartRepo.findById(cartId);

  if (!c) {
    return response.status(404).json({
      message: 'Cart with ID `' + cartId + ' was not found',
    });
  }

  var item = request.body.item;
  var product = productRepo.findById(item.productId);
  var qty = item.qty;

  c = cart.addItem(c, product, qty);

  c = cartRepo.persist(c);

  response.json({
    cart: c,
    total: cart.total(c),
  });
});

module.exports = router;
