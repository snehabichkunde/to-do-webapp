const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error(err);

  // Handle Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Validation Error',
      errors: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Handle custom errors (thrown from services)
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Validation Error',
      errors: messages,
    });
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(StatusCodes.CONFLICT).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Token expired',
    });
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  // Default server error
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;