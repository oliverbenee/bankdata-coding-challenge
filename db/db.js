const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bankdata_coding_challenge',
  password: 'g37TbukJZ',
  port: 5432,
})

const getAccounts = (request, response) => {
  pool.query('SELECT * FROM accounts ORDER BY id ASC', (error, results) => {
    if (error) { throw error }
    response.status(200).json(results.rows)
  })
}

module.exports = { 
  getAccounts
}