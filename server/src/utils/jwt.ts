import { sign, verify } from 'jsonwebtoken';
import config from '../config';
import { TokenPayload } from '../interfaces/user';

const createJWT = (payload: TokenPayload): string => {
  const token = sign(payload, config.jwtSecret, {
    expiresIn: config.jwtLifetime,
  });
  return token;
};

const getJwtPayload = (token: string): TokenPayload => {
  return verify(token, config.jwtSecret) as TokenPayload;
};

export { createJWT, getJwtPayload };
