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

// sendEmail('asdf', 'asdf');
const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => console.log('auth server is running on port', PORT));
