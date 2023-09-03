const express = require("express")
const app = express()
app.use(express.json()) 

const router = require("../routes/routes")
app.use(router)

let port = 3000
app.listen(port, () => {
  console.log(`now listening on ${port}`)
})

module.exports.app = app