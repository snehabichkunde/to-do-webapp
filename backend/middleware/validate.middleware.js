import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/app.error.js';
import ErrorCode from '../constants/error.names.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      return next(new AppError(
        'Validation failed',
        StatusCodes.BAD_REQUEST,
        'VALIDATION_ERROR',
        errors
      ));
    }
    
    req.body = result.data;
    next();
  };
};

export const validateParams = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);
    
    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      return next(new AppError(
        'Invalid parameters',
        StatusCodes.BAD_REQUEST,
        'VALIDATION_ERROR',
        errors
      ));
    }
    
    req.params = result.data;
    next();
  };
};

export const validateQuery = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);
    
    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      return next(new AppError(
        'Invalid query parameters',
        StatusCodes.BAD_REQUEST,
        'VALIDATION_ERROR',
        errors
      ));
    }
    
    req.query = result.data;
    next();
  };
};