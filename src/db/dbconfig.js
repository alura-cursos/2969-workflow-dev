/* eslint-disable import/no-mutable-exports */
import knex from 'knex';
import config from './knexfile.js';

let db = null;

if (process.env.NODE_ENV === 'test') {
  db = knex(config.test);
} else {
  db = knex(config.development);
}

export default db;
