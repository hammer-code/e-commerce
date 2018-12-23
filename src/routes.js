var express = require('express');
var productRepo = require('./repo/product');

var router = express.Router();

router.get('/products', function (request, response) {
  response.json({
    products: productRepo.all(),
  });
});

router.post('/products', function (request, response) {
  var body = request.body;
  var payload = {
    name: body.name,
    price: Number(body.price),
    description: body.description || '',
  };

  response.json({
    products: productRepo.create(payload),
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

router.patch('/products/:id', function (request, response) {
  var productId = request.params.id;
  var body = request.body;
  var payload = {
    name: body.name,
    price: body.price ? Number(body.price) : undefined,
    description: body.description || '',
  };

  var product;

  try {
    product = productRepo.updateById(productId, payload);
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    });
  }

  response.json({
    product: product,
  });
});

router.delete('/products/:id', function (request, response) {
  var productId = request.params.id;

  try {
    productRepo.remove(productId);
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    });
  }

  response.json({
    message: 'Product with ID' + productId + 'was successfully been deleted.',
  });
});

module.exports = router;
