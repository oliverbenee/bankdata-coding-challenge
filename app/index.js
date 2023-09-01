const express = require("express")
const app = express()

// Middleware "Body-parser" is used to parse request bodies.
const bodyParser = require("body-parser")
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.status(200).send("OK")
})

// Databazz
const db = require('../db/db')
app.get('/api/accounts', db.getAccounts)
app.post('/api/accounts', db.addAccount)

let port = 3000
app.listen(port, () => {
  console.log(`now listening on ${port}`)
})

module.exports.app = app