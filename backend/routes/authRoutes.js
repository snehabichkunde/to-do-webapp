const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile
} = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { registerSchema, loginSchema } = require('../validators/authValidator');

router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;