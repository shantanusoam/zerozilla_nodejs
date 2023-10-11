const jwt = require('jsonwebtoken');

// Secret key for JWT should be stored securely (not hardcoded)
const secretKey = 'lol';

const generateAuthToken = (user) => {
  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
  return token;
};


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (token == null) return res.status(401).json({ error: 'Unauthorized' });
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).json({ error: 'Forbidden' });
      req.user = user;
      next();
    });
  };

module.exports = {
  generateAuthToken,
  authenticateToken,
};
