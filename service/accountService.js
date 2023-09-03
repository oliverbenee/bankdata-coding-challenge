const accountDao = require('../dao/accountDao')

class AccountService {
  createAccount(accountObj){
    let {name, funds} = accountObj
    accountDao.createAccount(name, funds)
  }

  async getAccounts(){
    const res = await accountDao.getAccounts();
    return res
  }
}

module.exports = new AccountService();