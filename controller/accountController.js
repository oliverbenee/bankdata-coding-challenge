const accountService = require('../service/accountService')

class AccountController {
  async createAccount(req, res) {
    try {
      const id = await accountService.createAccount(req.body)
      res.status(201).json(id)
    } catch(error){
      console.log(error)
      res.status(500).json({"error": error})
    }
  }

  async getAccounts(req, res){
    try {
      const data = await accountService.getAccounts()
      res.status(200).send(data)
    } catch(error){
      console.log(error)
      res.status(500).json({"error": error})
    }
  }
module.exports = new AccountController();