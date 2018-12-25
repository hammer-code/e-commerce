function Cart (bus, options) {
  this.$el = null;
  this.bus = bus;
  this.cart = null;
  this.options = options || {
    tag: 'div',
    attributes: {
      class: 'cart',
    }
  };

  this._onCreated();
}

Cart.prototype._createContainer = function () {
  var $container = document.createElement(this.options.tag);

  var keys = Object.keys(this.options.attributes);

  for (var i = 0; i < keys.length; i++) {
    var attr = keys[i];
    var attrValue = this.options.attributes[attr];

    $container.setAttribute(attr, attrValue);
  }

  $container.innerText = 'Cart: $' + 0;

  return $container;
};

Cart.prototype._fetchCart = function () {
  var cartId = localStorage.getItem('cartId') || null;
  if (!cartId) return;

  var self = this;

  return getCart(cartId)
    .then(function (data) {
      self.cart = data.cart;
      self._updateView();
    });
}

Cart.prototype._updateView = function () {
  this.$el.innerText = 'Cart: $' + this.total();
};

Cart.prototype.total = function () {
  return this.cart.lineItems.reduce(function (acc, item) {
    return acc + (item.price * item.qty);
  }, 0);
};

Cart.prototype._onCreated = function () {
  this._build();
  this._fetchCart();

  this.bus.on('product:added', onProductAdded.bind(this));

  function onProductAdded (product) {
    var self = this;
    if (!self.cart) {
      createCart()
        .then(function (data) {
          return addItem(data.cart.id, product);
        })
        .then(function (data) {
          self.cart = data.cart;
          localStorage.setItem('cartId', data.cart.id);
          self._updateView();
        });
    } else {
      addItem(self.cart.id, product)
        .then(function (data) {
          self.cart = data.cart;
          self._updateView();
        });
    }
  }
};

Cart.prototype._build = function () {
  var $container = this._createContainer();

  this.$el = $container;
};

Cart.prototype.mount = function (element) {
  element.appendChild(this.$el);
};
