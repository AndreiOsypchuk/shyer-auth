import { CookieOptions } from 'express';

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 60 * 60 * 60 * 24,
  sameSite: 'none',
};

export const cookieFor = (option: 'access' | 'refresh'): CookieOptions => {
  if (!process.env.DEBUG) {
    switch (option) {
      case 'access': {
        return {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 15,
          sameSite: 'none',
        };
      }
      case 'refresh': {
        return {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 60 * 24,
          sameSite: 'none',
        };
      }
    }
  } else {
    return {};
  }
};
