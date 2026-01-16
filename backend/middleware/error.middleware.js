import { StatusCodes } from 'http-status-codes';
import ErrorCode from '../constants/error.names.js';
import { AppError } from '../utils/app.error.js';

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === ErrorName.ZOD_ERROR) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      code: ErrorCode.VALIDATION_ERROR,
      message: 'Validation Error',
      errors: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })),
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
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      code: ErrorCode.VALIDATION_ERROR,
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message),
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(StatusCodes.CONFLICT).json({
      success: false,
      code: ErrorCode.DUPLICATE_RESOURCE,
      message: `${field} already exists`,
    });
  }

  if (err.name === ErrorName.CAST_ERROR) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      code: ErrorCode.INVALID_ID,
      message: 'Invalid ID format',
    });
  }

  if (err.name === ErrorName.JWT_ERROR) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      code: ErrorCode.INVALID_TOKEN,
      message: 'Invalid token',
    });
  }

  if (err.name === ErrorName.TOKEN_EXPIRED_ERROR) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      code: ErrorCode.TOKEN_EXPIRED,
      message: 'Token expired',
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    code: ErrorCode.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error',
  });
};

export default errorHandler;