const express = require('express');
const callback = require('../controllers/callbackController');
const router = express.Router();

router.route("/callback").post(callback.callback);

module.exports = router;