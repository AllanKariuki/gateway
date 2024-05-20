const express = require('express');
const { sendb2bPayment } = require('../controllers/b2bController');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/b2b", protect, sendb2bPayment);
module.exports = router;

