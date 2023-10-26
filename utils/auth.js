const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

const generatePasswordResetToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

module.exports = {generatePasswordResetToken}