const asyncHandler = require('express-async-handler');
const pool = require('../config/db');
const axios = require('axios');
const getAccessToken = require('../middleware/authMiddleware');
const pool = require('../config/db');

const sendb2bPayment =  asyncHandler(async (req, res) => {
    const token = await getAccessToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const data = req.body;
    try {
        const response = await axios.post('https://sandbox.sasapay.app/api/v1/payments/b2b/', data, config);

        const insertLogs = 'INSERT INTO logs(request, status, type) VALUES($1, $2, $3)';
        const values = [JSON.stringify(data), response.data.status, 'b2b'];
        await pool.query(insertLogs, values);

        res.status(200).send({message: response});
    } catch (error) {
        console.log(error);

        const insertLogs = 'INSERT INTO logs(request, status, type) VALUES($1, $2, $3)';
        const values = [JSON.stringify(data), '500', 'b2b'];
        await pool.query(insertLogs, values);

        res.status(500).send({message: 'Error sending payment request'});
    }
});

module.exports = { sendb2bPayment };