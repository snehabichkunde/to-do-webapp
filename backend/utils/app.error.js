import { StatusCodes } from 'http-status-codes';
import ErrorName from '../constants/error.names.js';

export class AppError extends Error {
  constructor(
    message,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    code = ErrorName.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}