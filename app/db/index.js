"use strict"

var neo4j  = require('neo4j'),
    _      = require('lodash'),
    config = require('../../config.js');

var props = {
    url: config.neo4jUrl,
    auth: { username: config.neo4jUsername, password: config.neo4jPassword }
};
var db = new neo4j.GraphDatabase(props);

var transformRecipe = function(r){
    var props = r.recipe.properties
    var recipe = {
        id: props.id,
        name: props.name,
        source: { name: props.source_name, url: props.source_url },
        author: { name: props.author_name },
        description: props.description,
        image: { url: props.image_url },
        ingredients: _.map(r.ingredients, function(i){
            return i.properties;
        })
    };

    if (!recipe.image.url) delete recipe.image;
    if (!recipe.source.url) delete recipe.source;

    return recipe;
};

var search = function(searchParams, callback) {
    // ingredients can be made top-level results by making
    //   MATCH (result)-[:CONTAINS]->(i)
    // into
    //   OPTIONAL MATCH (result)-[:CONTAINS]->(i)
    var query = [
        'START f=node:node_auto_index("name:(*' + searchParams.term + '*)")',
        'OPTIONAL MATCH (r)-[:CONTAINS|TYPE_OF*]->(f)',
        'WITH collect(r) + collect(f) as coll UNWIND coll as result',
        'WITH DISTINCT result',
        'MATCH (result)-[:CONTAINS]->(i)',
        'WITH result as recipe, collect(i) as ingredients',
        'RETURN recipe, ingredients',
        'SKIP ' + searchParams.from,
        'LIMIT ' + searchParams.limit
    ].join("\n");

    db.cypher({ query:query }, function(err, results){
        if (err) throw err;

        var data = _.map(results, transformRecipe);
        callback(err, { data: data });
    });
};

var get = function(id, callback) {
    var query = [
        'MATCH (recipe:Recipe {id: "' + id + '"})',
        'MATCH (recipe)-[:CONTAINS]->(i)',
        'WITH recipe, collect(i) as ingredients',
        'RETURN recipe, ingredients'
    ].join("\n");
    db.cypher({ query:query }, function(err, results){
        if (err) throw err;

        var data = _.map(results, transformRecipe);
        callback(err, { data: data });
    });
};

var getSentiments = function(data, callback){
    var query = [
        'MATCH (u:User {id:"' + data.userId + '"})',
        'MATCH (u)-[:LIKES]-(recipe)',
        'WITH DISTINCT recipe',
        'MATCH (recipe)-[:CONTAINS]->(i)',
        'WITH recipe, collect(i) as ingredients',
        'RETURN recipe, ingredients'
    ].join("\n");

    db.cypher({ query:query }, function(err, results){
        if (err) throw err;

        var data = _.map(results, transformRecipe);
        callback(err, data);
    })
};

var createSentiment = function(data, callback){
    var query = [
        'MATCH (u:User {id:"' + data.userId + '"}),',
              '(r:Recipe {id:"' + data.recipeId + '"})',
        'CREATE (u)-[:LIKES]->(r)'
    ].join("\n");

    db.cypher({ query:query }, function(err, results){
        callback(err);
    });
};

module.exports.search = search;
module.exports.get = get;
module.exports.getSentiments = getSentiments;
module.exports.createSentiment = createSentiment;

