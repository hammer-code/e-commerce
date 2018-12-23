var express = require('express');
var cart = require('../../cart');
var cartRepo = require('../../repo/cart');
var lineItem = require('./line-item');

var router = express.Router();

router.post('/', function (request, response) {
  var c = cart.create();

  cartRepo.persist(c);

  response.status(201).json({
    cart: c,
  });
});

router.use('/:id/line-items', lineItem);

module.exports = router;
