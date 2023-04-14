import { Model } from 'mongoose';
import { createJWT } from '../utils/jwt';
import { IUserDocument } from '../interfaces/user';
import { AuthError, BadRequestError, NotFoundError } from '../errors';

export default class AuthService {
  constructor(private userModel: Model<IUserDocument>) {}

  private async userAlreadyExists(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return user != null;
  }

  public async getUserById(userId: string) {
    const userRecord = await this.userModel.findById(userId);
    if (!userRecord) {
      throw new AuthError('Invalid credentials');
    }
    return userRecord;
  }

  public async getUserByEmail(email: string) {
    let user;
    try {
      user = await this.userModel.findOne({ email });
    } catch (error) {
      throw new BadRequestError(`Invalid email ${email} `);
    }
    if (!user) throw new NotFoundError(`No user with email ${email}`);

    return user;
  }

  public async register({
    email,
    password,
    firstname,
    lastname,
    referenceLinks,
    personalNumber,
  }: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    referenceLinks: string[];
    personalNumber: number;
  }) {
    const alreadyExists = await this.userAlreadyExists(email);
    if (alreadyExists) {
      throw new BadRequestError('User with given email already exists.');
    }
    const user = await this.userModel.create({
      email,
      password,
      firstname,
      lastname,
      referenceLinks,
      personalNumber,
    });
    const token = createJWT({ userId: user._id, email });

    return { user, token };
  }

  public async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthError('Invalid credentials');
    }
    const isPasswordCorrect = await user.checkPassword(password);
    if (!isPasswordCorrect) {
      throw new AuthError('Invalid credentials');
    }
    const token = createJWT({ userId: user._id, email });
    return { user, token };
  }
}
