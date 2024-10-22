import { serialize } from 'cookie';  // For clearing the cookie

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Clear the session cookie by setting an empty cookie with an immediate expiration
      const cookie = serialize('userSession', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',  // For better CSRF protection
        maxAge: -1,  // Expire the cookie immediately
        path: '/'
      });

      // Set the cookie in the response header to clear it
      res.setHeader('Set-Cookie', cookie);

      // Respond with success message
      res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
      console.error('Error during logout:', err.message);
      res.status(500).json({ message: 'Error while logging out' });
    }
  } else {
    // If the method is not POST, return Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
