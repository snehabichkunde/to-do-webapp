import { StatusCodes } from 'http-status-codes';
import jwt from  'jsonwebtoken';
import * as userRepository from '../repositories/user.repository.js';
import asyncHandler from '../utils/async.handler.js';
import ErrorCode from '../constants/error.codes.js';
import { AppError } from '../utils/app.error.js';


const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(
      'Authorization token missing',
      StatusCodes.UNAUTHORIZED,
      ErrorCode.UNAUTHORIZED
    );
  }

  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new AppError(
      'Invalid or expired token',
      StatusCodes.UNAUTHORIZED,
      ErrorCode.INVALID_TOKEN
    );
  }

  const user = await userRepository.findById(decoded.id, 'name email role');

  if (!user) {
    throw new AppError(
      'User not found',
      StatusCodes.UNAUTHORIZED,
      ErrorCode.UNAUTHORIZED
    );
  }

  req.user = user;
  next();
});




export default authMiddleware;