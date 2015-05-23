"use strict"

var neo4j  = require('neo4j'),
    _      = require('lodash'),
    config = require('./config.js');

var props = {
    url: config.neo4jUrl,
    auth: { username: config.neo4jUsername, password: config.neo4jPassword }
};
var db = new neo4j.GraphDatabase(props);

var search = function(searchTerm, callback) {
    // ingredients can be made top-level results by making
    //   MATCH (result)-[:CONTAINS]->(i)
    // into
    //   OPTIONAL MATCH (result)-[:CONTAINS]->(i)
    var query = [
        'START f=node:node_auto_index("name:(*' + searchTerm + '*)")',
        'OPTIONAL MATCH (r)-[:CONTAINS|TYPE_OF*]->(f)',
        'WITH collect(r) + collect(f) as coll UNWIND coll as result',
        'WITH DISTINCT result',
        'MATCH (result)-[:CONTAINS]->(i)',
        'WITH result as recipe, collect(i) as ingredients',
        'RETURN recipe, ingredients'
    ].join("\n");

    db.cypher({ query:query }, function(err, results){
        if (err) throw err;

        var data = _.map(results, function(r){
            var recipe = r.recipe.properties;
            recipe.author = { name: recipe.author };
            recipe.ingredients = _.map(r.ingredients, function(i){
                return i.properties;
            });
            return recipe;
        });

        callback(err, { data: data });
    });
};

module.exports.search = search;

