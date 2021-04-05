import util from 'util';
import express, { Request, Response, Express } from 'express';
import { Middleware } from './middleware';
import { AppRouter } from './router';
const controller = (target: any): void => {
  // console.log(util.inspect(target.prototype, true, null, true));
  // console.log(util.inspect(target.prototype['Run'], true, 10, true));
  target.prototype['Print']();
  console.log('hei');
};
const property = <T>(
  target: Object,
  key: string,
  desc: TypedPropertyDescriptor<T>
): void => {
  // console.log(util.inspect(target, true, 10, true));
  console.log('===========');
  console.log(key);
  console.log(desc);
};
class Validator {
  public PORT(port: number): boolean {
    if (port !== 4000) return false;
    return true;
  }
  public get<K extends keyof Validator>(key: K) {
    return this[key];
  }
}
const validator = new Validator();
const variable = <T>(target: Object, key: string): void => {
  let value: any;
  const getter = (): T => value;
  const setter = (newVal: any): void => {
    if (!validator.get(key as keyof Validator)(newVal)) {
      Object.defineProperty(target, 'error', {
        value: 'PORT must be 4000',
      });
    } else {
      value = newVal;
    }
  };
  Object.defineProperty(target, key, {
    set: setter,
    get: getter,
  });
};

@controller
export class App {
  @variable
  private static PORT: string | number;
  private static InitCallback: (port: string | number, err?: string) => void;
  private static Server: Express;
  private static Router: express.Router;
  private static error: string;
  public static Init(
    port: string | number,
    cb: (port: string | number, err?: string) => void
  ): void {
    this.PORT = process.env.PORT || port;
    this.InitCallback = cb;
    this.Server = express();
    this.Router = AppRouter.Init();
    Middleware.Init(this.Server);
  }
  @property
  public static Run(): void {
    App.Server.get('/', (req: Request, res: Response) => {
      res.send('this is working');
    });
    App.Server.listen(App.PORT, () => App.InitCallback(App.PORT, App.error));
  }
  public static GetRouter(): express.Router {
    return App.Router;
  }
  public static Get(): Express {
    return App.Server;
  }
  public Print(): void {
    console.log('print from print');
  }
}
