var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'views/index.html'));
});

app.get('/cart', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'views/cart.html'));
});

module.exports = app;
