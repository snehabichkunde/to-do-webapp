const authService = require('../services/authService');


exports.registerUser = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || 'Server error',
    });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
  }
};

exports.getProfile = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};
