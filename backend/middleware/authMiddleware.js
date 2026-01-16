import { StatusCodes } from 'http-status-codes';
import jwt from  'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';
import asyncHandler from '../utils/asyncHandler.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw { 
      status: StatusCodes.UNAUTHORIZED, 
      message: 'Authorization token missing' 
    };
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  const user = await userRepository.findById(decoded.id, 'name email role');
  
  if (!user) {
    throw { 
      status: StatusCodes.UNAUTHORIZED, 
      message: 'User not found' 
    };
  }

  req.user = user;
  next();
});


export default authMiddleware;