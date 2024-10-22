import { authMiddleware } from '../middleware/authMiddleware';

export default async function handler(req, res) {
  authMiddleware(req, res, () => {
    res.status(200).json({ message: 'You are authenticated', user: req.user });
  });
}
