const { generateToken } = require('../utils/token');
const { comparePassword } = require('../utils/passwordUtils');
const userRepository = require('../repositories/userRepository');

exports.register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw { status: 400, message: 'Name, email and password are required' };
  }

  const userExists = await userRepository.existsByEmail(email);
  if (userExists) {
    throw { status: 409, message: 'User already exists' };
  }

  const user = await userRepository.createUser({ name, email, password });
  return user;
};

exports.login = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 400, message: 'Email and password required' };
  }

  const user = await userRepository.findByEmail(email, true);
  if (!user) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  const token = generateToken(user);
  return { user, token };
};