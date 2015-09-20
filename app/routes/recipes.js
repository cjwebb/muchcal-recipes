"use strict"

var db = require('../db');
var config = require('../../config.js');

var between = function(x, min, max) {
    return x >= min && x <= max;
}

var search = function(req, res){
    req.sanitize('q').trim();
    req.sanitize('from').trim();
    req.sanitize('limit').trim();
    req.checkQuery('q', 'Missing search term').notEmpty();
    req.checkQuery('from').optional().isInt();
    req.checkQuery('limit').optional().isInt();

    var errors = req.validationErrors();
    if (errors) return res.status(400).json(errors);

    var limit = config.defaultSearchResultsLength;
    if (between(req.query.limit, 0, config.maxSearchResultsLength)) {
        limit = req.query.limit;
    }

    var from = 0;
    // replace max with Number.MAX_SAFE_INTEGER when using ES6
    if (between(req.query.from, 0, 9007199254740991)) {
        from = req.query.from;
    }

    var searchParams = {
        term: req.query.q,
        limit: limit,
        from: from
    };

    console.log(searchParams);

    db.search(searchParams, function(err, result){
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
