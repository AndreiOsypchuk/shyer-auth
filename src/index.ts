import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import { establishDbConnection } from './dbconfig';
import './controller';
const app: Express = express();
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
import { router } from './controller/decorators';
app.use(router);

if (!process.env.DEBUG) {
  app.set('trust proxy', 1);
}

establishDbConnection();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('auth server is running on port', PORT));
