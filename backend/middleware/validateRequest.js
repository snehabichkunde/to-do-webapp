import  { StatusCodes } from 'http-status-codes';
import asyncHandler from '../utils/asyncHandler.js';

const validateRequest = (schema) => {
  return asyncHandler(async (req, res, next) => {
    schema.parse(req.body);
    next();
  });
};

export default validateRequest;