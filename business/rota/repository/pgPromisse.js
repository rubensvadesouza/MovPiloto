var promise = require('bluebird');
var options = {
    promiseLib: promise
};

var config = require("../config/config");
var pgp = require('pg-promise')(options);

module.exports = {
    db: pgp({
        user: config.username,
        host: 'localhost',
        database: config.database,
        password: config.password,
        port: 5432,
    })
};