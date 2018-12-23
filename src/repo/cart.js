var CARTS = [];

/**
 * Save cart into repository.
 * @param  {Entities.Cart} cart
 * @return {Entities.Cart}
 */
function persist (cart) {
  var c = findById(cart.id);

  if (!c) return store(cart);

  return update(cart);
}

/**
 * Find cart by its ID
 * @param  {string} cartId
 * @return {Entities.Cart|null}
 */
function findById (cartId) {
  return CARTS.find(function (cart) {
    return cart.id === cartId;
  }) || null;
}

function store (cart) {
  CARTS.push(cart)

  return cart;
}

function update (cart) {
  var cartIndex = CARTS.findIndex(function (_cart) {
    return cart.id === _cart.id;
  });

  if (cartIndex === -1) {
    var errorMessage = 'Cart with ID: `' + cart.id + '` was not found';
    throw new Error(errorMessage);
  }

  CARTS[cartIndex] = cart;

  return cart;
}

module.exports = {
  findById,
  persist,
};
