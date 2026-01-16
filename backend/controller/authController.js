const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');


exports.registerUser = asyncHandler(async (req, res) => {
    const user = await authService.register(req.body);

    res.status(201).json({
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
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
});

exports.getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
