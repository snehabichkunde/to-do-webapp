import { StatusCodes } from 'http-status-codes';
import ErrorName from '../constants/error.names.js';
import { AppError } from '../utils/app.error.js';

const errorHandler = (err, req, res, next) => {

  if (err.name === 'ZodError' || err.name === ErrorName.ZOD_ERROR) {
    const errors = err.issues?.map(e => {
      let message = e.message;
      
      if (e.code === 'invalid_type' && e.received === 'undefined') {
        const fieldName = e.path[0] || 'field';
        const capitalizedField = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
        message = `${capitalizedField} is required`;
      }
      
      return {
        field: e.path.join('.') || 'unknown',
        message: message
      };
    }) || [];
    
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: errors.length > 0 ? errors[0].message : 'Validation failed',
      errors: errors
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message,
    });
  }

  if (err.name === ErrorName.VALIDATION_ERROR) {
    const errors = Object.values(err.errors || {}).map(e => ({
      field: e.path,
      message: e.message
    }));
    
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: errors.length > 0 ? errors[0].message : 'Validation Error',
      errors: errors,
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    return res.status(StatusCodes.CONFLICT).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  if (err.name === ErrorName.CAST_ERROR) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  if (err.name === ErrorName.JWT_ERROR) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (err.name === ErrorName.TOKEN_EXPIRED_ERROR) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Token expired',
    });
  }

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';
  
  return res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;