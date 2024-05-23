const express = require('express');
const { sendb2bPayment } = require('../controllers/b2bController');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

router.post("/b2b", protect, checkRole('business'), sendb2bPayment);
module.exports = router;

