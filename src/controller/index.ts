import { NextFunction, Request, Response } from 'express';
import { withRouter, get, post, use } from './decorators';
import { User } from '../dbconfig/user.schema';
import { validate } from './decorators/validate';

const log = (req: Request, res: Response, next: NextFunction) => {
  console.log('middlewarssssssssssssse');
  return next();
};

@withRouter
class Controller {
  @post('/register')
  @validate
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, password } = req.body;
      const newUser = new User({
        firstName: 'Andrei',
        lastName: 'Osypchuck',
        email: 'andreasdf@gmail.com',
        password: '12345',
      });
      newUser.save();
      res.send(newUser.info);
    } catch (e) {
      res.send(e.message);
    }
  }
  @post('/login')
  @validate
  async login(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      res.send(`<h1>${JSON.stringify(users)}</h1>`);
    } catch (e) {
      res.json(e.message);
    }
  }
  @use(log)
  @get('/all')
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      res.send(JSON.stringify(users));
    } catch (e) {
      res.send(e.message);
    }
  }
}
