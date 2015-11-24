"use strict"

var express      = require('express'),
    expValidator = require('express-validator'),
    bodyParser   = require('body-parser'),
    morgan       = require('morgan'),
    cors         = require('cors'),
    app          = express();

var routes       = require('./app/routes');

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(expValidator());
app.use(cors());

app.get('/recipes', routes.recipes.search)
app.get('/recipes/random', routes.recipes.random)
app.get('/recipes/:id', routes.recipes.get)

app.listen(process.env.PORT || 10020);

