"use strict"

var db = require('../db');

var search = function(req, res){
    req.sanitize('q').trim();
    req.checkQuery('q', 'Missing search term').notEmpty();

    var errors = req.validationErrors();
    if (errors) return res.status(400).json(errors);

    db.search(req.query.q, function(err, result){
        if (err) res.status(500).send();

        return res.json(result);
    });
};

var get = function(req, res){
    db.get(req.params.id, function(err, result){
        if (err) res.status(500).send();

        return res.json(result);
    });
}

module.exports.search = search;
module.exports.get = get;
