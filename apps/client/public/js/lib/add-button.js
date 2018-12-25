function AddButton (product, bus) {
  this.$el = null;
  this.product = product;
  this.bus = bus;

  this._onCreated();
}

AddButton.prototype._onClick = function () {
  this.bus.emit('product:added', this.product);
}

AddButton.prototype._build = function () {
  var $button = document.createElement('button');
  $button.setAttribute('class', 'button is-primary');
  $button.innerText = 'Add to Cart';

  this.$el = $button;
  this.$el.addEventListener('click', this._onClick.bind(this));
};

AddButton.prototype._onCreated = function () {
  this._build();
}

AddButton.prototype.mount = function (el) {
  el.appendChild(this.$el);
}
