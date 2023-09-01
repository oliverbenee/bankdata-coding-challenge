--CREATE DATABASE bankdata_coding_challenge

CREATE TABLE IF NOT EXISTS accounts(
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	funds real NOT NULL
)