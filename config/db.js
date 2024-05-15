const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
    "user": process.env.USER,
    "host": "localhost",
    "database": "gateway-logs",
    "password": process.env.PASSWORD,
    "port": 5432,
    });

const createLogsTable = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
    c2blogs(
        id SERIAL PRIMARY KEY,
        MerchantCode VARCHAR(128) NOT NULL,
        NetworkCode VARCHAR(128) NOT NULL,
        PhoneNumber VARCHAR(128) NOT NULL,
        TransactionDesc VARCHAR(128) NOT NULL,
        AccountReference VARCHAR(128) NOT NULL,
        Currency VARCHAR(128) NOT NULL,
        Amount VARCHAR(128) NOT NULL,
        TransactionFee INT NOT NULL,
        CallbackURL VARCHAR(128) NOT NULL,
        created_date TIMESTAMP DEFAULT NOW()
    )`;
    try {
        const res = await pool.query(queryText);
    } catch (err) {
        console.log(err);
    }
}

createUserTable = async () => {
   const queryText = `CREATE TABLE IF NOT EXISTS
    users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL
    )`;
    try {
        const res = await pool.query(queryText);
    } catch (err) {
        console.log(err)
    }
}

createLogsTable();
createUserTable();

module.exports = pool;