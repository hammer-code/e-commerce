var ENDPOINT_BASE_URL = getEndpointBaseUrl();

function getEndpointBaseUrl () {
  var hostname = window.location.hostname;
  var isDev = hostname === 'localhost';

  return isDev
    ? 'http://localhost:3000'
    : 'https://hammercode-commerce-api.now.sh';
}

function getProducts () {
  return fetch(ENDPOINT_BASE_URL + '/api/products')
    .then(function (response) {
      return response.json();
    })
}

const toJSON = function (response) {
  if (response.status === 404) {
    throw new Error('Not found');
  }
  return response.json();
};

function getCart (cartId) {
  return fetch(ENDPOINT_BASE_URL + '/api/carts/' + cartId)
    .then(toJSON);
}

function createCart () {
  return fetch(ENDPOINT_BASE_URL + '/api/carts', {
    method: 'POST',
  })
  .then(toJSON);
}

function addItem (cartId, product) {
  return fetch(ENDPOINT_BASE_URL + '/api/carts/' + cartId + '/line-items', {
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
