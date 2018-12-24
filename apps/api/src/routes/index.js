var express = require('express');
var product = require('./product');
var cart = require('./cart');

var router = express.Router();

router.use('/products', product);
router.use('/carts', cart);

module.exports = router;
