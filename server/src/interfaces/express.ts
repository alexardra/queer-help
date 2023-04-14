import { Request } from 'express';
import { TokenPayload, IUser } from './user';

export interface TokenRequest extends Request {
  token: TokenPayload;
}

export interface ProtectedRequest extends TokenRequest {
  user: IUser;
}
