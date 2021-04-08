const methodHandler = (method: string) => {
  return (path: string): Function => {
    return (target: any, key: string, desc: PropertyDescriptor) => {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', method, target, key);
    };
  };
};

export const get = methodHandler('get');
export const post = methodHandler('post');
export const patch = methodHandler('patch');
export const del = methodHandler('delete');
