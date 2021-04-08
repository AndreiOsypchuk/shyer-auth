import { RequestHandler } from 'express';
import 'reflect-metadata';
export const use = (fn: RequestHandler) => {
  return (target: any, key: string, desc: PropertyDescriptor) => {
    const midarr = Reflect.getMetadata('middleware', target, key) || [];
    midarr.push(fn);
    Reflect.defineMetadata('middleware', midarr, target, key);
  };
};
