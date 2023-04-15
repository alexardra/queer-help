import AuthService from './auth';
import { createJWT } from '../utils/jwt';
import { BadRequestError } from '../errors';

export default class AdminService extends AuthService {
  public async register({
    email,
    password,
    firstname,
    lastname,
  }: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  }) {
    const alreadyExists = await this.personaAlreadyExists(email);
    if (alreadyExists) {
      throw new BadRequestError('User with given email already exists.');
    }
    const admin = await this.personaModel.create({
      email,
      password,
      firstname,
      lastname,
    });
    const token = createJWT({ personaId: admin._id, email });

    return { admin, token };
  }
}
