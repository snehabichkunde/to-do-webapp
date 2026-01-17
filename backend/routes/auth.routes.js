import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile
} from '../controller/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import validateRequest from '../middleware/validate.request.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.get('/profile', authMiddleware, getProfile);

export default router;