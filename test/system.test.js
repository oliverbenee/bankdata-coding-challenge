const request = require("supertest");

const app = require("../app/index.js").app;

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
      expect(newAccountsLength).toBeGreaterThan(oldLength)
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
  it("should have transfer endpoint", async () => {
    await request(app).put("/api/transfer")
    .expect(200)
  })

  it("should allow money to be transferred", async () => {   
    let accounts = (await request(app).get("/api/accounts")).body
    let account1funds = parseInt(accounts.shift().funds)
    let account2funds = parseInt(accounts.shift().funds)
    expect(account1funds).toBe(20)
    expect(account2funds).toBe(201)

    await request(app)
    .put("/api/transfer")
    .send({
      "from": 2,
      "to": 1,
      "funds": 10
    })
    .expect(200)

    accounts = (await request(app).get("/api/accounts")).body
    let a1new = parseInt(accounts.shift().funds)
    let a2new = parseInt(accounts.shift().funds)
    expect(a1new).toBe(30)
    expect(a2new).toBe(191)
  })
})



afterEach(async () => { 

});
