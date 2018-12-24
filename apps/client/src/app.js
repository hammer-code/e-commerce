var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.resolve(__dirname, '../public')));
app.get('/', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'views/index.html'));
});

module.exports = app;
