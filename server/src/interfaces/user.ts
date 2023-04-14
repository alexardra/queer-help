export enum UserVerificationStatus {
  Pending = 'pending',
  Verified = 'verified',
  Failed = 'Failed',
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  referenceLinks: string[];
  personalNumber: number;
  verificationStatus: UserVerificationStatus;
}

export interface IUserDto {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  verificationStatus: UserVerificationStatus;
}

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface IUserDocument extends IUser {
  checkPassword: (password: string) => Promise<boolean>;
}
