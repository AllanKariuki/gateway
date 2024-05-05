const asyncHandler = require('express-async-handler');

const sendb2bPayment =  (req, res) => {
    res.status(201).send({message: 'Payment sent'});
};

module.exports = { sendb2bPayment };