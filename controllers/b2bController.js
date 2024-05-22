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
        const insertRequestLogs = 'INSERT INTO b2blogs(MerchantCode, MerchantTransactiionReference, Currency, Amount, ReceiverMerchantCode, AccountReference, ReceiverAccountType, NetworkCode, Reason, CallbackURL, userId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
        const values = [
            data.MerchantCode,
            data.MerchantTransactionReference,
            data.Currency,
            data.Amount,
            data.ReceiverMerchantCode,
            data.AccountReference,
            data.ReceiverAccountType,
            data.NetworkCode,
            data.Reason,
            data.CallbackURL,
            req.user.id
        ];
        await pool.query(insertRequestLogs, values);
    } catch (error) {
        console.log(err);
    }

    try {
        const response = await axios.post('https://sandbox.sasapay.app/api/v1/payments/b2b/', data, config);

        const insertResponseLogs = `UPDATE b2blogs SET 
                   statusCode = $1,
                   detail = $2, 
                   B2BRequestID = $3, 
                   ConversationID = $4, 
                   OriginatorConversationID = $5, 
                   ResponseCode = $6, 
                   ResponseDescritpion = $7, 
                       WHERE AccountReference = $8`;
        const values = [
            response.data.statusCode,
            response.data.detail,
            response.data.B2BRequestID,
            response.data.ConversationID,
            response.data.OriginatorConversationID,
            response.data.ResponseCode,
            response.data.ResponseDescription,
            data.AccountReference
        ];
        await pool.query(insertResponseLogs, values);
        res.status(200).send({message: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
});

module.exports = { sendb2bPayment };