const bcrypt = require('bcryptjs');

// Optimize bcrypt rounds based on environment
const BCRYPT_ROUNDS = process.env.NODE_ENV === 'production' ? 8 : 10;

// Pre-configure bcrypt for better performance
const hashPassword = async (password) => {
  return await bcrypt.hash(password, BCRYPT_ROUNDS);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
  BCRYPT_ROUNDS
};
