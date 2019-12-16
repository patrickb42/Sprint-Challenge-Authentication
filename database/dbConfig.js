const knex = require('knex');

const knexConfig = require('../knexfile.js');

const { DB_ENV = 'development' } = process.env;

// module.exports = knex(knexConfig[DB_ENV]);
module.exports = knex(knexConfig.development);
