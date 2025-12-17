import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config';

export interface AuthRequest extends Request {
  userId?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  next();
};

export const isModerator = (req: Request, res: Response, next: NextFunction) => {
  next();
};
