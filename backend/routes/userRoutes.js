// userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming you have a User model
const router = express.Router();

// Login route with session management
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Save user ID to session (creates session)
    req.session.userId = user._id;
    req.session.email = user.email; // Store email or other necessary info in the session

    // Send response back
    res.status(200).json({ message: 'Login successful', user: { email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.status(200).json({ message: 'Logout successful' });
  });
});


// Protected route (requires login)
router.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Send user profile info if logged in
  res.status(200).json({ message: 'Profile', email: req.session.email });
});

module.exports = router;
