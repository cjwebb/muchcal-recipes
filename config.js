"use strict"

var config = require('12factor-config');

module.exports = config({
    neo4jUrl: {
        env: 'MUNCHCAL_NEO4J_URL',
        type: 'string',
        required: true
    },
    neo4jUsername: {
        env: 'MUNCHCAL_NEO4J_USERNAME',
        type: 'string',
        required: true
    },
    neo4jPassword: {
        env: 'MUNCHCAL_NEO4J_PASSWORD',
        type: 'string',
        required: true
    },
    defaultSearchResultsLength: {
        env: 'MUNCHCAL_SEARCH_RESULTS_LENGTH',
        type: 'integer',
        default: 9
    },
    maxSearchResultsLength: {
        env: 'MUNCHCAL_MAX_SEARCH_RESULTS_LENGTH',
        type: 'integer',
        default: 27
    },
    defaultRandomResultsLength: {
        env: 'MUNCHCAL_RANDOM_RESULTS_LENGTH',
        type: 'integer',
        default: 3
    },
    maxRandomResultsLength: {
        env: 'MUNCHCAL_MAX_RANDOM_RESULTS_LENGTH',
        type: 'integer',
        default: 27
    }
});

