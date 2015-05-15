"use strict"

var express      = require('express'),
    expValidator = require('express-validator'),
    bodyParser   = require('body-parser'),
    morgan       = require('morgan'),
    app          = express();

var db           = require('./data.js');

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(expValidator());

app.route('/recipes')
    .get(function(req, res){
        req.checkQuery('q', 'Missing search term').notEmpty();

        var errors = req.validationErrors();
        if (errors) return res.status(400).json(errors);

        return res.json(db.recipes);
    })

app.listen(process.env.PORT || 10020);

