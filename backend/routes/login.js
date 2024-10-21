// login.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Login Route
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  console.log('Received email:', email);
  console.log('Received password:', password);

  try {
    // Check if the user exists (case insensitive email query)
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') }).select('+password');
    console.log('User found:', user); // Debugging user object

    if (!user || !user.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create session and store user data
    req.session.user = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    console.log('Session data:', req.session.user); // Check if session is working

    // Respond with success message
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
