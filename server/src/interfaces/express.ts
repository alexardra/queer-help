import { Request } from 'express';
import { TokenPayload, PersonaRoleTypes, IPersona } from './personas';

export interface TokenRequest extends Request {
  token: TokenPayload;
}

export interface ProtectedRequest extends TokenRequest {
  persona: IPersona;
  role: PersonaRoleTypes.ADMIN | PersonaRoleTypes.USER;
}
