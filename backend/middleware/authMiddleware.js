const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // If token starts with 'Bearer ', remove it
    const actualToken = token.startsWith('Bearer ') ? token.slice(7, token.length).trimLeft() : token;

    // Verify the token using the JWT secret
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    // Attach the decoded user info to the request object for further usage in routes
    req.user = decoded.user; // Assuming the JWT payload contains `user`

    next(); // Move to the next middleware or route handler
  } catch (err) {
    console.error('Token validation failed:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
