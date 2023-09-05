const request = require("supertest");

const app = require("../app/index.js").app;

const db = require('../db/db')

// database reset.
if(process.env.NODE_ENV === 'staging'){
  db.raw("truncate table accounts; ALTER SEQUENCE accounts_id_seq RESTART WITH 1")
  .then(() => {})
}

beforeEach(async () => { });

describe("GET api/accounts", () => {
  it("should return a response", async () => {
    const res = await request(app)
    .get("/api/accounts")
    .expect(200)
    .expect('Content-Type', /json/)
  })
})

const daoStub = require('../dao/daoStub.js')

describe("POST api/accounts", () => {
  it("should have a post account endpoint", async () => {
    const res = await request(app)
    .post("/api/accounts")
    .send(daoStub.testAccounts[0])
    .expect(201)
    .expect('Content-Type', /json/)
  });

  it("should add the account to the database", async () => {
    let accounts = await request(app).get("/api/accounts")
    let oldLength = accounts.body.length
    let newAccountsLength

    request(app).post("/api/accounts").send(daoStub.testAccounts[1])
    .then(async(res) => {
      expect(res.statusCode).toBe(201)
      let newAccounts = await request(app).get("/api/accounts")
      let newAccountsLength = await newAccounts.body.length
      expect(newAccountsLength).toBe(oldLength+1)
    })
  })

  it("should let accounts hold money", async() => {
    const res = await request(app)
    .get("/api/accounts")
    .expect(200)
    // Supertest has built-in features for checking request bodies, but they seem to be very syntax dependent. 
    // .expect([
    //     {"id": "1", "name": "Oliver", "funds": "20" },
    //     {"id": "2", "name": "Klaus", "funds": "201"}
    //   ])

    let accounts = res.body
    let account1funds = parseInt(accounts.pop().funds)
    let account2funds = parseInt(accounts.pop().funds)

    expect(account1funds).not.toBeNull()
    expect(account1funds).toBe(201)
    expect(account2funds).not.toBeNull()
    expect(account2funds).toBe(20)
  })
})

describe("PUT api/transfer", () => {
  it("should have transfer endpoint, that produces error with no params", async () => {
    await request(app).put("/api/transfer")
    .expect(500)
  })

  // this test was made after the one allowing for transfer, but supertest seems to create a race condition. 
  it("should block a transfer if the funds do not exist", async () => {
    let accounts = (await request(app).get("/api/accounts")).body
    let account1funds = parseFloat(accounts.shift().funds)
    let account2funds = parseFloat(accounts.shift().funds)

    await request(app)
    .put("/api/transfer")
    .send({
      "from": 2,
      "to": 1,
      "amount": 999
    })
    .expect(500)

    let accounts2 = (await request(app).get("/api/accounts")).body
    let account1fundsafter = parseFloat(accounts2.shift().funds)
    let account2fundsafter = parseFloat(accounts2.shift().funds)
    expect(account1fundsafter).toBe(account1funds)
    expect(account2fundsafter).toBe(account2funds)
  })

  it("should allow money to be transferred", async () => {   
    let accounts = (await request(app).get("/api/accounts")).body
    expect(accounts.length).toBe(2)
    let account1funds = parseFloat(accounts.shift().funds)
    let account2funds = parseFloat(accounts.shift().funds)
    expect(account1funds).toBe(20)
    expect(account2funds).toBe(201)

    await request(app)
    .put("/api/transfer")
    .send({
      "from": 2,
      "to": 1,
      "amount": 10
    })
    .expect('"OK"')
    .expect(200)

    let newAccounts = (await request(app).get("/api/accounts")).body
    console.log(newAccounts)
    let a1new = parseFloat(newAccounts.shift().funds)
    let a2new = parseFloat(newAccounts.shift().funds)
    expect(a1new).toBe(30)
    expect(a2new).toBe(191)
  })

  it("should not allow money to be transferred from non-existent accounts", async () => {
    let accounts = (await request(app).get("/api/accounts")).body
    let account1funds = parseFloat(accounts.shift().funds)

    await request(app)
    .put("/api/transfer")
    .send({
      "from": 9999,
      "to": 1,
      "amount": 999
    })
    .expect(500)

    let account1fundsafter = parseFloat((await request(app).get("/api/accounts")).body.shift().funds)
    expect(account1fundsafter).toBe(account1funds)
  })
})



afterEach(async () => { 

});
