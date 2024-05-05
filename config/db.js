import Pool from 'pg';

require('dotenv').config();

const pool = new Pool.Pool({
    "user": process.env.USER,
    "host": "localhost",
    "database": "gateway-logs",
    "password": process.env.DB_PASS,
    "port": 5432,
    });

export default pool;