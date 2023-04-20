import { Model } from 'mongoose';
import { createJWT } from '@/utils/jwt';
import { BadRequestError } from '@/errors';

import {
  IUserDocument,
  UserRole,
  UserVerificationStatus,
} from '@/interfaces/personas';
import AuthService from './auth';

export default class UserService extends AuthService {
  constructor(public personaModel: Model<IUserDocument>) {
    super(personaModel);
  }

  public async register({
    email,
    password,
    firstname,
    lastname,
    referenceLinks,
    personalNumber,
    role,
    phoneNumber,
    description,
  }: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    referenceLinks: string[];
    personalNumber: number;
    role: UserRole;
    phoneNumber?: number;
    description?: string;
  }) {
    const alreadyExists = await this.personaAlreadyExists(email);
    if (alreadyExists) {
      throw new BadRequestError('User with given email already exists.');
    }
    const user = await this.personaModel.create({
      email,
      password,
      firstname,
      lastname,
      referenceLinks,
      personalNumber,
      role,
      phoneNumber,
      description,
      verificationStatus: UserVerificationStatus.Pending,
    });
    const token = createJWT({ personaId: user._id, email });

    return { user, token };
  }

  public async updateVerificationStatus(
    userId: string,
    status: UserVerificationStatus,
  ) {
    await this.personaModel.findByIdAndUpdate(userId, {
      $set: { verificationStatus: status },
    });
  }

  public async getUsers() {
    const users = await this.personaModel
      .find({})
      .select('+createdAt')
      .sort({ createdAt: 'desc' });

    return { users, totalCount: users.length };
  }
}
