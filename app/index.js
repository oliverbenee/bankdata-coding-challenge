const express = require("express")
const bodyparser = require("body-parser")
const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

const router = require("../routes/routes")
app.use(router)

let port = 3000
app.listen(port, () => {
  console.log(`now listening on ${port}`)
})

module.exports.app = app