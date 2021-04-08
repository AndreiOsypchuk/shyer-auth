import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

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
  static register = (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password }: regBody = req.body;
    if (firstName && lastName && email && password) {
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
}
