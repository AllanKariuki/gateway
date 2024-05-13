const asyncHandler = require('express-async-handler');
const pool = require('../config/db');
const axios = require('axios');

const callback = asyncHandler(async (req, res) => {
    const data = req.body;
    try {
        const insertLogs = 'INSERT INTO logs(request, status, type) VALUES($1, $2, $3)';
        const values = [JSON.stringify(data), '200', 'callback'];
        await pool.query(insertLogs, values);

        res.status(200).send({message: 'Callback received'});
    } catch (error) {
        console.log(error);

        const insertLogs = 'INSERT INTO logs(request, status, type) VALUES($1, $2, $3)';
        const values = [JSON.stringify(data), '500', 'callback'];
        await pool.query(insertLogs, values);

        res.status(500).send({message: 'Error receiving callback'});
    }
    res.status(200).send({message: JSON.stringify(data)});
});

module.exports = { callback };