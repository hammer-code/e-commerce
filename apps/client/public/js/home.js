var BASE_ENDPOINT_URL = 'http://localhost:3000/api';

getProducts();

function getProducts () {
  return fetch(BASE_ENDPOINT_URL + '/products')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.products.forEach(function (product) {
        $productCard = createProductCardEl(product);

        appendToAppEl($productCard);
      });
    })
}

function appendToAppEl ($el) {
  var $app = document.querySelector('#app');

  $app.appendChild($el);
}

function createProductNameEl (name, tag) {
  var $name = document.createElement(tag);
  $name.innerText = name;
  return $name;
}

function createProductCardEl (product) {
  var $name = createProductNameEl(product.name, 'h3');

  var $card = document.createElement('div');
  $card.setAttribute('class', 'product-card');

  $card.appendChild($name);

  return $card;
}
