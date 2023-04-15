import { sign, verify } from 'jsonwebtoken';
import config from '../config';
import { TokenPayload } from '../interfaces/personas';

const createJWT = (payload: TokenPayload): string => {
  const token = sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.lifetime,
  });
  return token;
};

const getJwtPayload = (token: string): TokenPayload => {
  return verify(token, config.jwt.secret) as TokenPayload;
};

export { createJWT, getJwtPayload };
