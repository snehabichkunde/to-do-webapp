const { StatusCodes } = require('http-status-codes');
const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

exports.registerUser = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'User registered successfully',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { user, token } = await authService.login(req.body);
  
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Login successful',
    token,
    user: { 
      id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    },
  });
});

exports.getProfile = asyncHandler(async (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    user: req.user,
  });
});