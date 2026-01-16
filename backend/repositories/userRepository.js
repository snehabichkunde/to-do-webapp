const User = require('../models/UserModel');

exports.findByEmail = (email, withPassword = false) => {
  if (withPassword) {
    return User.findOne({ email }).select('+password');
  }
  return User.findOne({ email });
};

exports.createUser = (userData) => User.create(userData);