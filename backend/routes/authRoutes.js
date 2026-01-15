const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Register
router.post('/register', registerUser);
// Login
router.post('/login', loginUser);

// authentication
router.get('/profile', authMiddleware);




module.exports = router;
