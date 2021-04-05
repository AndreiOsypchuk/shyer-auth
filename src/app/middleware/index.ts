import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
export class Middleware {
  public static Init(app: Express): void {
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
  }
}
