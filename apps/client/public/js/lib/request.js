const toJSON = function (response) {
  if (response.status === 404) {
    throw new Error('Not found');
  }
  return response.json();
};

function getCart (cartId) {
  return fetch('http://localhost:3000/api/carts/' + cartId)
    .then(toJSON);
}

function createCart () {
  return fetch('http://localhost:3000/api/carts', {
    method: 'POST',
  })
  .then(toJSON);
}

function addItem (cartId, product) {
  return fetch('http://localhost:3000/api/carts/' + cartId + '/line-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item: {
        productId: product.id,
        qty: 1,
      }
    })
  })
  .then(toJSON);
}
