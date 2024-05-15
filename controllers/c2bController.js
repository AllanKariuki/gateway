const asyncHandler = require('express-async-handler');
const pool = require('../config/db');
const axios = require('axios');
const { getAccessToken } = require('../middleware/authMiddleware');

const requestc2bPayment =  asyncHandler(async (req, res) => {
    let token
    try{
        token = await getAccessToken();
    } catch(error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
    //Get user role and check if authorized to make request
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const data = req.body;

    try {
        const response = await axios.post('https://sandbox.sasapay.app/api/v1/payments/request-payment/', data, config);

        // const insertLogs = 'INSERT INTO logs(request, status) VALUES($1, $2, $3)';
        // const values = [JSON.stringify(data), response.data.status];
        // await pool.query(insertLogs, values);
        res.status(200).send({message: response.data});
    } catch (error) {
        console.log(error);

        // const insertLogs = 'INSERT INTO logs(request, status) VALUES($1, $2, $3)';
        // const values = [JSON.stringify(data), '500'];
        // await pool.query(insertLogs, values);

        // res.status(500).send({message:error});
    }
});

const processc2bPayment = asyncHandler(async (req, res) => {
    let token;
    try{
        token = await getAccessToken();
    } catch (error) {
        console.log(error);
    }
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const data = req.body;

    try {
        const response = await axios.post('https://sandbox.sasapay.app/api/v1/payments/process-payment/', data, config);
        res.status(200).send({message: response.data});
    } catch (error) {
        console.log(error);
    }
});

module.exports = { requestc2bPayment, processc2bPayment };