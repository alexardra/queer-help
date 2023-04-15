/********** Token **********/

interface TokenPayload {
  personaId: string;
  email: string;
}

/********** Persona **********/

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

interface IUser extends IPersona {
  referenceLinks: string[];
  personalNumber: number;
  verificationStatus: UserVerificationStatus;
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
  IUser,
  IUserDto,
  IUserDocument,
  IAdmin,
  IPersonaDto as IAdminDto,
  IAdminDocument,
};
