import 'reflect-metadata';
import { BodyValidator, Validators } from '../middleware';
export const validate = (
  target: any,
  key: string,
  desc: PropertyDescriptor
) => {
  const midarr = Reflect.getMetadata('middleware', target, key) || [];
  const prop = key as Validators;
  midarr.push(BodyValidator[prop]);
  Reflect.defineMetadata('middleware', midarr, target, key);
};
