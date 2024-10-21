const express = require('express');
const router = express.Router();

// Logout route
router.post('/', (req, res) => {
  // Destroy the session to log out the user
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }

    // Clear the session cookie
    res.clearCookie('connect.sid'); // This depends on what your session ID cookie name is
    res.status(200).json({ message: 'Logout successful' });
  });
});


module.exports = router;
