# Case: Account API

In this case you must implement an API for a bank account that allows users to create an account, list their accounts and transfer funds between accounts.

The API must implement the following operations:

| Operation     | Description                                                       |
| --------------|-------------------------------------------------------------------|
| `CREATE`      | create an account                                                 |
| `LIST`        | list accounts                                                     |
| `TRANSFER`    | transfer a specified amount from one account to another account   |

## Considerations 
The following list of considerations are things that might be relevant when implementing the above API. You do not need to address all of these concerns in your code, but ideally you have considered how you would address them.
1. **Error handling**: What if an account has insufficient funds for a transfer? What if a specified account does not exist?
2. **Security**: How to ensure accounts can only be accessed by their registered owners?
3. **Auditing**: How to make sure the transaction history is available for auditing?
4. **Observability**: How to monitor the health of this application?

## Optional Features
1. **Persistence**: include a database
2. **Frontend**: provide a frontend that allows users to interact with the API
3. **Deployment**: deploy your application in a public cloud hosting service