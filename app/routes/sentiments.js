"use strict"

var db = require('../db');

var get = function(req, res){
    var userId = req.query.userId;
    db.getSentiments({ userId: userId }, function(err, result){
        if (err) throw err;

        res.json(result);
    })
};

var create = function(req, res){
    // todo - validate input
    var data = req.body;
    console.log(data);

    db.createSentiment(data, function(err){
        if (err) throw err;

        res.status(201).end();
    })
};

exports.create = create;
exports.get = get;

