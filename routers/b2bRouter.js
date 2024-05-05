const express = require('express');
const sendb2bPayment = require('../controllers/b2bController');
const router = express.Router();

router.route("/b2b/").get(sendb2bPayment.sendb2bPayment);

module.exports = router;

