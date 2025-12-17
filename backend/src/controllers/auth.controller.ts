import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth.config';

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstName, lastName, profession } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      profession: profession || undefined,
    });

    await user.save();

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profession: user.profession,
      createdAt: user.createdAt,
    };

    res.status(201).json({
      message: 'User registered successfully!',
      user: userResponse,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    res.status(500).json({ message: error.message || 'Error registering user' });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res.status(400).json({ message: 'Username or email and password are required' });
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username/email or password' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid username/email or password' });
    }

    const token = jwt.sign({ id: user._id }, authConfig.secret, {
      expiresIn: 86400,
    });

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profession: user.profession,
    };

    res.status(200).json({
      user: userResponse,
      accessToken: token,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error during login' });
  }
};
