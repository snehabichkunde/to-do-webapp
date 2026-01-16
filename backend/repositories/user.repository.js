import User from '../models/user.model.js';

export const findByEmail = (email, withPassword = false) => {
  if (withPassword) {
    return User.findOne({ email }).select('+password');
  }
  return User.findOne({ email });
};

export const findById = (id, selectFields = 'name email role') => {
  return User.findById(id).select(selectFields);
};

export const createUser = (userData) => {
  return User.create(userData);
};

export const existsByEmail = async (email) => {
  const user = await User.findOne({ email });
  return !!user;
};