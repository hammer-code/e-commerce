var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes');

var app = express();

app.use(cors({
  origin: '*',
}));
app.use(bodyParser.json());
app.use('/api', routes);

module.exports = app;
