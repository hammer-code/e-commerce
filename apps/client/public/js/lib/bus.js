function Bus () {
  this.handlers = {};
}

Bus.prototype.on = function (event, callback) {
  if (Array.isArray(this.handlers[event])) {
    this.handlers[event].push(callback);
    return;
  } else if (this.handlers[event] === undefined) {
    this.handlers[event] = [callback];
  }
}

Bus.prototype.emit = function (event, payload) {
  var handlers = this.handlers[event];
  if (!Array.isArray(handlers)) return;

  for (var i = 0; i < handlers.length; i++) {
    var handler = handlers[i];

    handler(payload);
  }
}

Bus.prototype.off = function (event, callback) {
  if (Array.isArray(this.handlers[event])) {
    var handlerIndex = this.handlers[event].indexOf(callback);
    this.handlers[event].splice(handlerIndex, 1);
    return;
  }
}

