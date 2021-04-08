import { Request, Response } from 'express';
import { withRouter, get, post } from './decorators';
import { User } from '../dbconfig/user.schema';

@withRouter
class Controller {
  @post('/register')
  async register(req: Request, res: Response) {
    try {
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
  async login(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.send(`<h1>${JSON.stringify(users)}</h1>`);
    } catch (e) {
      res.json(e.message);
    }
  }
}
