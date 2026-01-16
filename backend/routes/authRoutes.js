import express from 'express';
const router = express.Router();

import {
  registerUser,
  loginUser,
  getProfile
} from '../controller/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';

router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.get('/profile', authMiddleware, getProfile);

export default router;