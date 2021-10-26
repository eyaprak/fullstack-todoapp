const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['x-auth-token'];
  if (authHeader) {
    const user = await jwt.verify(authHeader, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).json('Invalid token. Please login again.');
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json('Invalid token. Please login again.');
  }
};

module.exports = verifyToken;
