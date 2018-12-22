var express = require('express');
var productRepo = require('./repo/product');

var router = express.Router();

router.get('/products', function (request, response) {
  response.json({
    products: productRepo.all(),
  });
});

router.get('/products/:id', function (request, response) {
  var productId = request.params.id;
  var product = productRepo.findById(productId)

  if (!product) {
    return response.status(404).json({
      message: 'Product with ID: `' + productId + '` was not found',
    });
  }

  response.json({
    product: product,
  });
});

module.exports = router;
