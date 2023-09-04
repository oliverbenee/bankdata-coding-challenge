const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).send("OK")
})

const accountController = require('../controller/accountController')

router.post("/api/accounts", accountController.createAccount)
router.get("/api/accounts", accountController.getAccounts)
router.put("/api/transfer", accountController.transferMoney)

module.exports = router
