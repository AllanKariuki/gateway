const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const { createUser, loginUser, getMe } = require('../controllers/usersController');

router.post('/users', createUser);
router.post('/users/login', loginUser);
router.get('/users/me', protect, getMe);


module.exports = router;