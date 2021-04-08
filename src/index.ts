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
app.use(cors());
import { router } from './controller/decorators';
app.use(router);
establishDbConnection();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('auth server is running on port', PORT));
