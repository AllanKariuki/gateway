const asyncHandler = require('express-async-handler');
const pool = require('../config/db');
const axios = require('axios');
const getAccessToken = require('../middleware/authMiddleware');

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
        res.status(201).send({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Error sending payment request'});
    }
});

module.exports = { sendb2bPayment };