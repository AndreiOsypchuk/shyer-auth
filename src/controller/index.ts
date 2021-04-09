import { NextFunction, Request, Response } from 'express';
import { withRouter, get, post, use } from './decorators';
import { User } from '../dbconfig/user.schema';
import { validate } from './decorators/validate';
import { regBody, logBody } from './middleware';
import { encrypt } from './utils';
import { cookieFor } from './utils/cookieconf';
import { generateTokens } from './utils/authTokens';
@withRouter
class Controller {
  @post('/register')
  @validate
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, password }: regBody = req.body;
      const hash = await encrypt(password);
      const newUser = new User({ firstName, lastName, email, password: hash });
      newUser.save((e: any) => {
        if (e) {
          res.status(400).json({ message: e.message });
        } else {
          res.send(newUser.info);
        }
      });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  @post('/login')
  @validate
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: logBody = req.body;
      const users = await User.find();
      res.send(`<h1>${JSON.stringify(users)}</h1>`);
    } catch (e) {
      res.json(e.message);
    }
  }
  @get('/all')
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      const [acc, ref] = generateTokens('thing');
      res.cookie('acc', acc, cookieFor('access'));
      res.json(users);
    } catch (e) {
      res.send(e.message);
    }
  }
}
