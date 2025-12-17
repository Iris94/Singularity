import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userByUsername = await User.findOne({ username: req.body.username });
    if (userByUsername) {
      return res.status(400).json({ message: 'Username is already taken!' });
    }

    const userByEmail = await User.findOne({ email: req.body.email });
    if (userByEmail) {
      return res.status(400).json({ message: 'Email is already in use!' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking duplicates' });
  }
};

export const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
  next();
};
