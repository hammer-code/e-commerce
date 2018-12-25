var BASE_ENDPOINT_URL = 'http://localhost:3000/api';

var bus = new Bus();

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
  var $products = document.querySelector('#products');

  $products.appendChild($el);
}

function createProductNameEl (name, tag) {
  var $name = document.createElement(tag);
  $name.setAttribute('class', 'title is-3');
  $name.innerText = name;
  return $name;
}

function createProductPriceEl (price) {
  var $price = document.createElement('p');
  $price.innerText = '$' + price;
  return $price;
}

function createProductCardEl (product) {
  var $column = document.createElement('div');
  $column.setAttribute('class', 'column');

  var $card = document.createElement('div');
  $card.setAttribute('class', 'card product-card');

  var $name = createProductNameEl(product.name, 'h3');
  var $price = createProductPriceEl(product.price);

  $card.appendChild($name);
  $card.appendChild($price);

  var addButton = new AddButton(product, bus)
  addButton.mount($card);

  $column.appendChild($card);

  return $column;
}

var cart = new Cart(bus, {
  tag: 'a',
  attributes: {
    href: '/cart',
    class: 'navbar-item',
  }
});

cart.mount(document.querySelector('#cart'));
