let accountsTemplates = [
  {
    "id": 1,
    "name": "Oliver",
    "funds": 20
  },
  {
    "id": 2,
    "name": "Klaus",
    "funds": 201
  }
]

let accounts = accountsTemplates

class DaoStub {
  // throw failures up to service layer.
  async createAccount(name, funds){
    return accounts.push({name, funds})
  }

  async transferMoney(from, to, amount){
    if(!from || !to || !amount){
      throw new Error(`invalid arguments. Missing from, to, or amount: ${from}, ${to}, ${amount}`)
    }
    console.log("PARAMS: ", from, to, amount)
    let fromA = accounts[parseInt(from)-1]
    let toA = accounts[parseInt(to)-1]

    fromA.funds -= parseInt(amount)
    toA.funds += parseInt(amount)

    return "OK"
  }

  async getAccounts(){
    return accounts
  }
}

module.exports = new DaoStub()
module.exports.testAccounts = accountsTemplates