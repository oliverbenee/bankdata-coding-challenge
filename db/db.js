const knex = require('knex')
const knexfile = require('./knexfile')

// TODO: inject process.env dependency injection for prod.
// TODO: don't access knexfile.development directly, but use env vars.
const db = knex(knexfile.development)
module.exports = db