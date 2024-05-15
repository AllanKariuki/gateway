const express = require('express')
const router = express.Router()
const regConf = require('../controllers/regConfController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register-callback-url', protect, regConf)

module.exports = router