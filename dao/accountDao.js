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

  async transferMoney(from, to, amount){
    if(!from || !to || !amount){
      throw new Error('Invalid arguments')
    }

    const res = await db.transaction(trx => {
      db('accounts')
      .transacting(trx).decrement('funds', amount).where('id', '=', from)
      .then((trx) => {
        return db('accounts')
        .increment('funds',amount).where('id','=',to)
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .then((res) => {console.log(`OK ${res}`)})
    return res
  }

  async getAccounts(){
    const res = await db('accounts')
    .withSchema('public')
    .select('name', 'funds')
    .orderBy('id')
    .then((result) => { return result })
    return res
  }
}

module.exports = new AccountDao()