import { StatusCodes } from 'http-status-codes';
import ErrorCode from '../constants/error.codes.js'; 

export class AppError extends Error {
  constructor(
    message,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    code = ErrorCode.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
