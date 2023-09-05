--CREATE DATABASE bankdata_coding_challenge

/*CREATE TABLE IF NOT EXISTS accounts(
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	funds real NOT NULL
);*/
--INSERT INTO accounts(name, funds) VALUES('oliver',100.5)

--TRUNCATE TABLE accounts

--UPDATE accounts set funds = funds - 20 where id = 1;
--UPDATE accounts set funds = funds + 20 where id = 2;
--SELECT * FROM accounts

/*
BEGIN;
	UPDATE accounts set funds = funds - 20 where id = 2;
	UPDATE accounts set funds = funds + 20 where id = 1;
COMMIT;
*/


truncate table accounts
--DROP table knex_migrations, knex_migrations_lock, accounts