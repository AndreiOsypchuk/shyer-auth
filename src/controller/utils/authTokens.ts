import jwt from 'jsonwebtoken';
export const generateTokens = (id: string): [string, string] => {
  let acc = '';
  let ref = '';
  if (process.env.JWT_ACC && process.env.JWT_REF) {
    acc = jwt.sign({ id }, process.env.JWT_ACC, {
      expiresIn: '15m',
      issuer: 'shyer-auth',
    });

    ref = jwt.sign({ id }, process.env.JWT_REF, {
      expiresIn: '1d',
      issuer: 'shyer-auth',
    });
  }
  return [acc, ref];
};
