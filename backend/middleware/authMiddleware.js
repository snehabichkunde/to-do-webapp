const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const asyncHandler = require('../utils/asyncHandler');


const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw { status: 401, message: 'Authorization token missing' };
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('name email role');

    if (!user) {
      throw { status: 401, message: 'User not found' };
    }

    req.user = user;
    next();
  });


module.exports = authMiddleware; 
