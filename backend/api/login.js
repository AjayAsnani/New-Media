import bcrypt from 'bcryptjs';
import User from '../models/User';  // Adjust the path if necessary
import { serialize } from 'cookie';  // To manage cookies

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    try {
      // Find the user by email (case insensitive)
      const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') }).select('+password');
      
      if (!user || !user.password) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Create a session using cookies
      const sessionUser = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      };

      // Serialize the session into a cookie with improved settings
      const cookie = serialize('userSession', JSON.stringify(sessionUser), {
        httpOnly: true,  // Ensure cookie is HTTP-only (not accessible by JavaScript)
        secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
        sameSite: 'Strict',  // Add CSRF protection (Lax can also be used if needed)
        maxAge: 60 * 60 * 24 * 7,  // 1 week
        path: '/'
      });

      // Set the cookie in the response header
      res.setHeader('Set-Cookie', cookie);

      // Respond with success message
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      console.error('Error during login:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    // If the method is not POST, return Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
