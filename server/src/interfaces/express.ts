import { Request } from 'express';
import { TokenPayload, IUser, IAdmin } from './personas';

export interface TokenRequest extends Request {
  token: TokenPayload;
}

export interface ProtectedRequest extends TokenRequest {
  persona: IUser | IAdmin;
}
