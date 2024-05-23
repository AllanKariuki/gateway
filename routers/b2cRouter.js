const express = require('express');
const { sendb2cPayment } = require('../controllers/b2cController');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

router.post("/b2c", protect, checkRole('business'), sendb2cPayment)

module.exports = router;