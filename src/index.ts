import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import { establishDbConnection } from './dbconfig';
import { sendEmail } from './emailing';
const app: Express = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
establishDbConnection();

// sendEmail('andrewostin13@gmail.com');
import { User } from './dbconfig/user.schema';

app.get(
  '/',
  async (req, res): Promise<void> => {
    try {
      const newUser = new User({
        firstName: 'Phill',
        lastName: 'HUi',
        email: 'pjil@.gmail.com',
        password: '12345',
      });
      newUser.save();
      res.send(newUser.info);
    } catch (e) {
      res.send(e.message);
    }
  }
);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('auth server is running on port', PORT));
