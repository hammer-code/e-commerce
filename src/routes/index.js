var express = require('express');
var product = require('./product');

var router = express.Router();

router.use('/products', product);

module.exports = router;
