const express = require('express');
const { sendb2cPayment } = require('../controllers/b2cController');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/b2c", protect, sendb2cPayment)

module.exports = router;