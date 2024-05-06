const express = require('express');
const c2bController = require('../controllers/c2bController');
const router = express.Router();

router.route("/c2b/").get(c2bController.sendc2bPayment);

module.exports = router;