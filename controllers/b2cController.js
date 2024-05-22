const express = require('express');
const asyncHandler = require('express-async-handler');
const pool = require('../config/db');
const axios = require('axios');
const getAccessToken = require('../middleware/authMiddleware');

const sendb2cPayment = asyncHandler( async (req, res) => {
   const token = await getAccessToken();
   const config = {
       headers: {
           Authorization: `Bearer ${token}`
       }
   }

   const data = req.body;
   try {
       const insertRequestLogs = 'INSERT INTO b2clogs(userId, MerchantCode, Amount, CURRENCY, MerchantTransactionReference, ReceiverNumber, Channel, Reason, CallbackURL) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
       const values = [
           req.user.id,
           data.MerchantCode,
           data.Amount,
           data.CURRENCY,
           data.MerchantTransactionReference,
           data.ReceiverNumber,
           data.Channel,
           data.Reason,
           data.CallbackURL
       ]
       await pool.query(insertRequestLogs, values);
   } catch (error) {
       console.log(error);
   }
    try {
         const response = await axios.post('https://sandbox.sasapay.app/api/v1/payments/b2c/', data, config);

         const updateb2cLogs = `UPDATE b2clogs SET 
                status = "PENDING",
                detail = $1,
                B2CRequestID = $2,
                ConversationID = $3,
                OriginatorConversationID = $4,
                ResponseCode = $5,
                ResponseDescription = $6
                WHERE MerchantTransactionReference = $7
                   `;
         const values = [
                response.data.detail,
                response.data.B2CRequestID,
                response.data.ConversationID,
                response.data.OriginatorConversationID,
                response.data.ResponseCode,
                response.data.ResponseDescription,
                data.MerchantTransactionReference
         ];
         await pool.query(updateb2cLogs, values);

         res.status(200).send({message: response.data.status});
    } catch (error) {
         console.log(error);
         res.status(500).send({message: error.message});
    }
});

module.exports = { sendb2cPayment };
