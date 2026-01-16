const { StatusCodes } = require('http-status-codes');
const { generateToken } = require('../utils/token');
const { comparePassword } = require('../utils/passwordUtils');
const userRepository = require('../repositories/userRepository');

exports.register = async ({ name, email, password }) => {
  const userExists = await userRepository.existsByEmail(email);
  if (userExists) {
    throw { 
      status: StatusCodes.CONFLICT, 
      message: 'User already exists' 
    };
  }

  const user = await userRepository.createUser({ name, email, password });
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email, true);
  if (!user) {
    throw { 
      status: StatusCodes.UNAUTHORIZED, 
      message: 'Invalid credentials' 
    };
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw { 
      status: StatusCodes.UNAUTHORIZED, 
      message: 'Invalid credentials' 
    };
  }

  const token = generateToken(user);
  return { user, token };
};