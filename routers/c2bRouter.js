const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {requestc2bPayment, processc2bPayment} = require('../controllers/c2bController');
const router = express.Router();
const { checkRole } = require("../middleware/roleMiddleware");

router.post("/c2b/request", protect, checkRole('customer'), requestc2bPayment);
router.post("/c2b/process", protect, checkRole('customer'), processc2bPayment);


module.exports = router;