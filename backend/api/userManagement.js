import User from '../models/User'; // Import the User model
import { dbConnect } from '../utils/dbConnect'; // MongoDB connection

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await dbConnect();

      // Fetch all users from the database
      const users = await User.find();

      // Send the user data as a response
      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching users:', err.message);
      res.status(500).json({ message: 'Server error while fetching users' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
