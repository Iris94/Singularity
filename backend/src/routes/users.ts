import express, { Request, Response } from 'express';
import User from '../models/User';
import { verifyToken, AuthRequest } from '../middlewares/authJwt';

const router = express.Router();

router.get('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

export default router;
