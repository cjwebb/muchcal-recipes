"use strict"

var express      = require('express'),
    expValidator = require('express-validator'),
    bodyParser   = require('body-parser'),
    morgan       = require('morgan'),
    app          = express();

var db           = require('./db.js');

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(expValidator());

app.route('/recipes')
    .get(function(req, res){
        req.sanitize('q').trim();
        req.checkQuery('q', 'Missing search term').notEmpty();

        var errors = req.validationErrors();
        if (errors) return res.status(400).json(errors);

        db.search(req.query.q, function(err, result){
            if (err) res.status(500).send();

            return res.json(result);
        });
    });

app.route('/recipes/:id')
    .get(function(req, res){
        db.get(req.params.id, function(err, result){
            if (err) res.status(500).send();

            return res.json(result);
        });
    });

app.listen(process.env.PORT || 10020);

