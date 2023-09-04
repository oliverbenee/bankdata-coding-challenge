# Bankdata Coding Challenge Oliver.

This is my solution to the bankdata coding challenge. The challenge is presented in a [account.md](account.md).
Overall, the purpose of the challenge is to provide an API with a list of accounts, which store an account ID, name, and funds. The API facilitates the creation and reading of, as well as transfer between accounts using the endpoints:
- POST '/api/accounts'
- GET '/api/accounts'
- PUT '/api/transfer'

In short, the solution uses a Controller to handle HTTP and delegating them. The controller forwards requests to the service, which handles forwarding requests either to a mock database or the real database. The variability is handled using a DAO - either a stub, which mocks the database as an array, or one which uses postgres as a real database.

The solution can run in two environments. It assumes, you have [node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)ejs installed, can install packages using ``npm install``.

If you do not have PostgreSQL, you can mock the database using:
```
npm run dev
```

All tests are run using the mock. Run tests using:
```
npm run test
```
Alternatively a postgresql can be used. This assumes the machine is running a postgresql server. Verify the settings for the database in ``db/knexfile.js`` under ``development connection`` before attempting to connect. The settings for connection to a database client are found here.

```
    client: 'postgresql',
    connection: {
      database: 'bankdata_coding_challenge',
      user:     'postgres',
      password: 'g37TbukJZ'
    },
```

The system can be run using a postgresql database by running:
```
npm run migrate
npm run start
```

