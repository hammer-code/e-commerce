var PRODUCTS = [
  { id: 'product-1', name: 'YDKJS', price: 20 },
  { id: 'product-2', name: 'Eloquent JS', price: 20 },
  { id: 'product-3', name: 'Effective Engineer', price: 50 },
  { id: 'product-4', name: 'Clean Code', price: 70 },
];

function all () {
  return PRODUCTS;
}

function findById (productId) {
  return PRODUCTS.find(product => product.id === productId);
}

module.exports = {
  all: all,
  findById: findById,
};
