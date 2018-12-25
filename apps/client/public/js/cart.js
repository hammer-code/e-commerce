/**
 * Cart page
 */

var $app = document.querySelector('#app');

var cartId = localStorage.getItem('cartId') || null;

if (cartId) {
  createCart();
}

function createCart () {
  var $container = document.createElement('div');
  $container.setAttribute('class', 'cart');

  getCart(cartId)
    .then(function (data) {
      var $header = createHeader();

      $container.appendChild($header);

      for (var i = 0; i < data.cart.lineItems.length ; i++) {
        var item = data.cart.lineItems[i];

        var $row = createItemRow(item);

        $container.appendChild($row);
      }

      var $footer = createFooter(data.total);
      $container.appendChild($footer);

      $app.appendChild($container);
    })
    .catch(function () {
      var $message = createEmptyMessage();

      $container.appendChild($message);
      $app.appendChild($container);
    });
}

function createEmptyMessage () {
  var $message = document.createElement('div');
  $message.innerText = 'Belum ada item belanja';

  return $message;
}

function createHeader () {
  var $row = document.createElement('div');
  $row.setAttribute('class', 'cart-row cart-header');

  var $name = createCell('Name', '');
  var $price = createCell('Price', '');
  var $qty = createCell('Qty', '');
  var $subtotal = createCell('Subtotal', '');

  $row.appendChild($name);
  $row.appendChild($price);
  $row.appendChild($qty);
  $row.appendChild($subtotal);

  return $row;
}

function createFooter (total) {
  var $row = document.createElement('div');
  $row.setAttribute('class', 'cart-row cart-footer');

  var $x = createCell('Total', '');
  var $y = createCell('', '');
  var $z = createCell('', '');
  var $total = createCell('$' + total, '');

  $row.appendChild($x);
  $row.appendChild($y);
  $row.appendChild($z);
  $row.appendChild($total);

  return $row;
}

function createItemRow (lineItem) {
  var $row = document.createElement('div');
  $row.setAttribute('class', 'cart-row');

  var $name = createCell(lineItem.name, 'line-item-name')
  var $price = createCell('$' + lineItem.price, 'line-item-price')
  var $qty = createCell(lineItem.qty, 'line-item-qty')
  var $subtotal = createCell('$' + (lineItem.qty * lineItem.price), 'line-item-subt-total')

  $row.appendChild($name);
  $row.appendChild($price);
  $row.appendChild($qty);
  $row.appendChild($subtotal);

  return $row;
}

function createCell (value, className) {
  var $cell = document.createElement('span');
  $cell.setAttribute('class', 'row-cell ' + className);
  $cell.innerText = value;

  return $cell;
}
