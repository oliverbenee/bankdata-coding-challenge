const Pool = require("pg").Pool;
const request = require("supertest");
require("dotenv").config();

const app = require("../app/index.js").app;

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
})

beforeEach(async () => { });

describe("GET api/accounts", () => {
  it("should return a response list of accounts", async () => {
    const res = await request(app).get("/api/accounts")
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })
})

let testAccount = {
  "name": "oliver",
  "funds": 20
}

describe("POST api/accounts", () => {
  it("should have a post account endpoint", async () => {
    let res = await request(app).post("/api/accounts").send(testAccount);
    expect(res.statusCode).toBe(201);
  });

  it("should add the account to the database", async () => {
    let accounts = await request(app).get("/api/accounts")
    let oldLength = accounts.body.length
    let newAccountsLength

    request(app).post("/api/accounts").send(testAccount)
    .then(async(res) => {
      expect(res.statusCode).toBe(201)
      let newAccounts = await request(app).get("/api/accounts")
      let newAccountsLength = await newAccounts.body.length
      expect(newAccountsLength).toBeGreaterThan(oldLength)
    })
  })

  it("should let accounts hold money", async() => {
    let accounts = (await request(app).get("/api/accounts")).body
    let account1funds = accounts.shift().funds;
    let account2funds = accounts.shift().funds;

    expect(account1funds).not.toBeNull()
    expect(account1funds).toBeGreaterThan(0)
    expect(account2funds).not.toBeNull()
    expect(account2funds).toBeGreaterThan(0)
  })
})

afterEach(async () => { });
