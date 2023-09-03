const { default: knex } = require('knex');
const db = require('../db/db');

class AccountDao {
  // throw failures up to service layer.
  async createAccount(name, funds){
    const [id] = await db('accounts')
    .insert({
      name: name,
      funds: funds
    })
    .returning('id')

    return id
  }
  async getAccounts(){
    const res = await db('accounts')
    .withSchema('public')
    .select('name', 'funds')
    .then((result) => { return result })
    return res
  }
}

module.exports = new AccountDao()