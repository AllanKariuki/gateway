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
    c2brequestlogs(
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
        created_date TIMESTAMP DEFAULT NOW(),
        status VARCHAR(50) DEFAULT 'Pending',
        details VARCHAR(128) DEFAULT 'No details',
        PaymentGateway VARCHAR(128) DEFAULT 'SasaPay',
        MerchantRequestID VARCHAR(128) DEFAULT 'No message',
        CheckoutRequestID VARCHAR(128) DEFAULT 'No message',
        ResponseCode VARCHAR(128) DEFAULT 'No message',
        ResponseDescription VARCHAR(128) DEFAULT 'No message',
        CustomerMessage VARCHAR(520) DEFAULT 'No message'
    )`;
    try {
        const res = await pool.query(queryText);
    } catch (err) {
        throw new Error(err.message);
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
        throw new Error(err.message);
    }
}

createc2bProcessTable = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
    c2bprocesslogs(
        id SERIAL PRIMARY KEY,
        CheckoutRequestID VARCHAR(128) NOT NULL,
        MerchantCode VARCHAR(128) NOT NULL,
        VerificationCode VARCHAR(128) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        detail VARCHAR(128) DEFAULT 'No details',
                       )`;
    try {
        const res = await pool.query(queryText);
    }catch (err) {
        throw new Error(err.message);
    }
}

createLogsTable();
createUserTable();
createc2bProcessTable();

module.exports = pool;