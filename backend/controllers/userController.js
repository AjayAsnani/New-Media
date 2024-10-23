import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User';
import { dbConnect } from '../utils/dbConnect';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  console.log(FRONTEND_URL)

  if (req.method === 'OPTIONS') {
    // Handle preflight requests for CORS
    return res.status(200).end();
  }

  // Validate input fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, streetAddress, town, state, pincode, phone, email, nomineeName, sponsorId, vigilanceOfficer, accountUsername, password } = req.body;

  try {
    // Connect to MongoDB
    await dbConnect();

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { accountUsername }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      streetAddress,
      town,
      state,
      pincode,
      phone,
      email,
      nomineeName,
      sponsorId,
      vigilanceOfficer,
      accountUsername,
      password: hashedPassword,
      role: 'user', // Default role set to 'user'
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    const userWithoutPassword = { ...savedUser._doc, password: undefined }; // Hide password in the response
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User';
import { dbConnect } from '../utils/dbConnect';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    // Handle preflight requests for CORS
    return res.status(200).end();
  }

  // Validate input fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Connect to MongoDB
    await dbConnect();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Use 401 for unauthorized access
    }

    // Create a JWT payload
    const payload = {
      user: { id: user._id, role: user.role },
    };

    // Sign JWT token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
