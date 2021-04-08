import { NextFunction, Request, Response } from 'express';
import { User } from '../../dbconfig';

export enum Validators {
  register = 'register',
  login = 'login',
}

export interface regBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface logBody {
  email: string;
  password: string;
}

export class BodyValidator {
  static register = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password }: regBody = req.body;
    const exists = await BodyValidator.checkIfUnique(email);
    if (exists) {
      res.status(402).json({ message: 'User already exists' });
    } else if (firstName && lastName && email && password) {
      return next();
    } else {
      res.status(401).json({ message: 'Invalid request body' });
    }
  };

  static login = (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: logBody = req.body;
    if (email && password) {
      return next();
    } else {
      res.status(401).json({ message: 'Invalid request body' });
    }
  };

  private static checkIfUnique = async (email: string): Promise<boolean> => {
    try {
      const user = await User.countDocuments({ email });
      return user >= 1;
    } catch (e) {
      return false;
    }
  };
}
