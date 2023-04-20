/********** Token **********/

interface TokenPayload {
  personaId: string;
  email: string;
}

/********** Persona **********/
export enum PersonaRoleTypes {
  ADMIN = 'admin',
  USER = 'user',
}

interface IPersona {
  _id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

interface IPersonaDto {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: PersonaRoleTypes.ADMIN | PersonaRoleTypes.USER;
}

interface IPersonaDocument extends IPersona {
  checkPassword: (password: string) => Promise<boolean>;
}

/********** User **********/

enum UserVerificationStatus {
  Pending = 'pending',
  Verified = 'verified',
  Failed = 'Failed',
}

enum UserRole {
  Beneficiary = 1,
  Volunteer = 2,
  Both = 3,
}

interface IUser extends IPersona {
  referenceLinks: string[];
  personalNumber: number;
  verificationStatus: UserVerificationStatus;
  role: UserRole;
  phoneNumber?: string;
  description?: string;
}

interface IUserDto extends IPersonaDto {
  verificationStatus: UserVerificationStatus;
}

type IUserDocument = IPersonaDocument & IUser;

/********** Admin **********/

interface IAdmin extends IPersona {
  active: boolean;
}

type IAdminDocument = IPersonaDocument & IAdmin;

export {
  TokenPayload,
  UserVerificationStatus,
  UserRole,
  IPersona,
  IUser,
  IUserDto,
  IUserDocument,
  IAdmin,
  IPersonaDto as IAdminDto,
  IAdminDocument,
};
