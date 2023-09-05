let accountDao
if(process.env.NODE_ENV === 'staging'){
  accountDao = require('../dao/accountDao')
} else {
  accountDao = require('../dao/daoStub')
}

class AccountService {
  createAccount(accountObj){
    let {name, funds} = accountObj
    accountDao.createAccount(name, funds)
  }

  transferMoney(from, to, amount){
    return accountDao.transferMoney(from, to, amount)
  }

  async getAccounts(){
    const res = await accountDao.getAccounts();
    return res
  }
}

module.exports = new AccountService();