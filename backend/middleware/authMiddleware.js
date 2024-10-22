const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied, no token provided' });
  }

  try {
    // If the token starts with 'Bearer ', remove it
    const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length).trim() : token;

    // Verify the token using the JWT secret
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object
    req.user = decoded.user; // Assuming the JWT payload contains `user`

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token validation failed:', err.message || err); // More detailed logging
    res.status(401).json({ message: 'Invalid token, authorization denied' });
  }
};

module.exports = auth;
