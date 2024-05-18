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
        const insertc2brequestLogs = 'INSERT INTO c2brequestlogs(MerchantCode, NetworkCode, PhoneNumber, TransactionDesc, AccountReference, Currency, Amount, TransactionFee, CallBackURL) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
        const values = Object.values(data);
        const request = await pool.query(insertc2brequestLogs, values);
    } catch (error) {
        console.log(error);
    }
    try {
        const response = await axios.post('https://sandbox.sasapay.app/api/v1/payments/request-payment/', data, config);
        const insertResponse = `UPDATE c2brequestlogs SET
                   status = $1,
                   details = $2,
                   PaymentGateway = $3,
                   MerchantRequestID = $4,
                   CheckoutRequestID = $5,
                   ResponseCode = $6,
                   ResponseDescription = $7,
                   CustomerMessage = $8
               WHERE AccountReference = $9`;

        const updateValues = [
            response.data.status,
            response.data.detail,
            response.data.PaymentGateway,
            response.data.MerchantRequestID,
            response.data.CheckoutRequestID,
            response.data.ResponseCode,
            response.data.ResponseDescription,
            response.data.CustomerMessage,
            data.AccountReference
        ];

        await pool.query(insertResponse, updateValues);

        res.status(200).send({message: response.data});
    } catch (error) {
        res.status(500).send({message:error.message});
    }
});

const processc2bPayment = asyncHandler(async (req, res) => {
    let token;
    try{
        token = await getAccessToken();
    } catch (error) {
        throw new Error(error.message);
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
        res.status(500).send({message:error.message});
    }
});

module.exports = { requestc2bPayment, processc2bPayment };
