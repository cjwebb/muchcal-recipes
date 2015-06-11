"use strict"

var express      = require('express'),
    expValidator = require('express-validator'),
    bodyParser   = require('body-parser'),
    morgan       = require('morgan'),
    app          = express();

var routes       = require('./app/routes');

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(expValidator());

app.get('/recipes', routes.recipes.search)
app.get('/recipes/:id', routes.recipes.get)
app.get('/sentiments', routes.sentiments.get);
app.post('/sentiments', routes.sentiments.create);

app.listen(process.env.PORT || 10020);

