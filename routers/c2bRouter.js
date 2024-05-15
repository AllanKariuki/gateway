const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {requestc2bPayment, processc2bPayment} = require('../controllers/c2bController');
const router = express.Router();

router.post("/c2b/request", requestc2bPayment);
router.post("/c2b/process", processc2bPayment);


module.exports = router;