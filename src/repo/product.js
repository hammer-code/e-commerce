var PRODUCTS = [
  { id: 'product-1', name: 'YDKJS', price: 20 },
  { id: 'product-2', name: 'Eloquent JS', price: 20 },
  { id: 'product-3', name: 'Effective Engineer', price: 50 },
  { id: 'product-4', name: 'Clean Code', price: 70 },
];

/**
 * Get all products.
 * @return {Entities.Product}
 */
function all () {
  return PRODUCTS;
}

/**
 * Find product by its ID.
 * @param  {string} productId
 * @return {Entities.Product|null}
 */
function findById (productId) {
  return PRODUCTS.find(product => product.id === productId) || null;
}

/**
 * Create new product.
 * @param  {object}  payload
 * @param  {string}  payload.name
 * @param  {string}  payload.price
 * @param  {string?} payload.description
 * @return {Product}
 */
function create (payload) {
  var id = nextID();

  var newProduct = {
    id: id,
    name: payload.name,
    price: payload.price,
    description: payload.description,
  };

  PRODUCTS.push(newProduct);

  return newProduct;
}

/**
 * Get last product
 * @return {Entities.Product|null}
 */
function last () {
  return PRODUCTS[PRODUCTS.length - 1] || null;
}

/**
 * Get next product ID
 * @return {string}
 */
function nextID () {
  var lastProduct = last();

  if (!last) return 'product-1';

  var lastNumber = Number(lastProduct.id.replace('product-', ''));

  return 'product-' + (lastNumber + 1);
}

module.exports = {
  all: all,
  create: create,
  findById: findById,
};
