const asyncHandler = require('express-async-handler');
const pool = require('../config/db');
const sendb2bPayment =  (req, res) => {
    res.status(201).send({message: 'Payment sent'});
};

module.exports = { sendb2bPayment };