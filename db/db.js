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

const addAccount = (request, response) => {
  pool.query(
    'INSERT INTO accounts (name, funds) values ($1, $2)', 
    [request.body.name, request.body.funds], 
    (error, results) => {
      if(error) { 
        throw error
        return response.status(400).send(error)
      } else {
        return response.status(201).send("added")
      }
    }
  )
}

module.exports = { 
  getAccounts,
  addAccount
}