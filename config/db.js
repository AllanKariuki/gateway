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
    logs(
        id UUID PRIMARY KEY,
        request VARCHAR(300) NOT NULL,
        status TEXT NOT NULL,
        created_date TIMESTAMP DEFAULT NOW()
    )`;
    try {
        const res = await pool.query(queryText);
    } catch (err) {
        console.log(err);
    }
}

createLogsTable();

module.exports = pool;