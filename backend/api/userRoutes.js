import bcrypt from 'bcryptjs';
import User from '../models/User'; // Assuming you have a User model
import { serialize } from 'cookie'; // To manage cookies
import { dbConnect } from '../utils/dbConnect'; // MongoDB connection

// Login route
export default async function handler(req, res) {
  if (req.method === 'POST' && req.url === '/api/userRoutes/login') {
    const { email, password } = req.body;

    try {
      await dbConnect();

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

      // Create session using cookies
      const cookie = serialize('userSession', JSON.stringify({ userId: user._id, email: user.email }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
      });

      res.setHeader('Set-Cookie', cookie);
      res.status(200).json({ message: 'Login successful', user: { email: user.email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  } else if (req.method === 'POST' && req.url === '/api/userRoutes/logout') {
    // Logout route
    const cookie = serialize('userSession', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // Expire the cookie immediately
      path: '/'
    });

    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({ message: 'Logout successful' });
  } else if (req.method === 'GET' && req.url === '/api/userRoutes/profile') {
    // Protected profile route
    const { cookies } = req;
    const session = cookies.userSession ? JSON.parse(cookies.userSession) : null;

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Send profile info
    res.status(200).json({ message: 'Profile', email: session.email });
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
