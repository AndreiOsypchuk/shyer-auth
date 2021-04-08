import express, { RequestHandler } from 'express';
import 'reflect-metadata';
export const router: express.Router = express.Router();

enum Methods {
  get = 'get',
  post = 'post',
  patch = 'patch',
  del = 'delete',
}

export const withRouter = (target: any) => {
  for (let key in target.prototype) {
    const routeHandler = target.prototype[key];
    const method: Methods = Reflect.getMetadata(
      'method',
      target.prototype,
      key
    );
    const path = Reflect.getMetadata('path', target.prototype, key);
    const middleware =
      Reflect.getMetadata('middleware', target.prototype, key) || [];
    router[method](path, ...middleware, routeHandler);
  }
};
