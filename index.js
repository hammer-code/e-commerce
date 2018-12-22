var cart = require('./src/cart')
var discountRepo = require('./src/repo/discount')

var c = cart.create();

var products = [
  { id: 'product-1', name: 'YDKJS', price: 200 },
  { id: 'product-2', name: 'EloquentJS', price: 80 },
];

c = cart.addItem(c, products[0], 2);
c = cart.addItem(c, products[1], 1);

var totalA = cart.format(cart.total(c));
console.log('Total sebelum diskon', totalA);

var d = discountRepo.findByCode('HAMMERCODE10');
var totalB = cart.format(cart.total(c, d));
console.log('Total setelah diskon', totalB);
