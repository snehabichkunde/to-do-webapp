const User = require('../models/UserModel');

exports.findByEmail = (email, withPassword = false) => {
  if (withPassword) {
    return User.findOne({ email }).select('+password');
  }
  return User.findOne({ email });
};

exports.findById = (id, selectFields = 'name email role') => {
  return User.findById(id).select(selectFields);
};

exports.createUser = (userData) => {
  return User.create(userData);
};

exports.existsByEmail = async (email) => {
  const user = await User.findOne({ email });
  return !!user; 
};