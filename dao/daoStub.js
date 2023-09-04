let accounts = [
  {
    "id": 1,
    "name": "Oliver",
    "funds": "20"
  },
  {
    "id": 2,
    "name": "Klaus",
    "funds": "201"
  }
]

class DaoStub {
  // throw failures up to service layer.
  async createAccount(name, funds){
    return accounts.push({name, funds})
  }

  async getAccounts(){
    return accounts
  }
}

module.exports = new DaoStub()
module.exports.testAccounts = accounts