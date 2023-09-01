console.log("hello world!")

const express = require("express")
const app = express()

let port = 3000

app.get("/", (req, res) => {
  res.send("OK")
})

app.listen(port, () => {
  console.log(`now listening on ${port}`)
})

