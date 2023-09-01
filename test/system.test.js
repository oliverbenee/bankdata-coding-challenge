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

afterEach(async () => { });
