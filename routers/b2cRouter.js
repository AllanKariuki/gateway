const express = require('express');
const sendb2cPayment = require('../controllers/b2cController');
const router = express.Router();

router.route("/b2c").post(sendb2cPayment.sendb2cPayment);

module.exports = router;