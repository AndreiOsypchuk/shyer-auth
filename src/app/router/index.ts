import express from 'express';

export class AppRouter {
  private static Self: express.Router;
  public static Init(): express.Router {
    if (!AppRouter.Self) {
      AppRouter.Self = express.Router();
    }
    return AppRouter.Self;
  }
}
