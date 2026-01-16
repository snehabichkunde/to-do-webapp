const asyncHandler = require('../utils/asyncHandler');

const validateRequest = (schema) => {
  return asyncHandler(async (req, res, next) => {
    schema.parse(req.body); 
    next();
  });
};

module.exports = validateRequest;