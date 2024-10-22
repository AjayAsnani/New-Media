import bcrypt from 'bcryptjs'; // For password hashing
import User from '../models/User'; // Import the User model
import { dbConnect } from '../utils/dbConnect'; // MongoDB connection

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
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
      password,
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !accountUsername) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    try {
      // Connect to the database
      await dbConnect();

      // Check if the user already exists (by email or username)
      const existingUser = await User.findOne({ $or: [{ email }, { accountUsername }] });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email or username already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
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
        password: hashedPassword, // Save the hashed password
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
      console.error('Error registering user:', err.message);
      res.status(500).json({ message: 'Server error during registration.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
