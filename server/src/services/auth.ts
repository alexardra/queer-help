import { Model } from 'mongoose';
import { AuthError } from '../errors/apiError';
import { createJWT } from '../utils';
import { BadRequestError, NotFoundError } from '../errors/apiError';
// import { IUserDocument, IAdminDocument } from 'interfaces/personas';

export default class AuthService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public personaModel: Model<any>) {}

  public async getPersonaById(personaId: string) {
    const personaRecord = await this.personaModel.findById(personaId);
    if (!personaRecord) {
      throw new AuthError('Invalid credentials');
    }
    return personaRecord;
  }

  public async getPersonaByEmail(email: string) {
    let persona;
    try {
      persona = await this.personaModel.findOne({ email });
    } catch (error) {
      throw new BadRequestError(`Invalid email ${email} `);
    }
    if (!persona) throw new NotFoundError(`No persona with email ${email}`);

    return persona;
  }

  public async personaAlreadyExists(email: string): Promise<boolean> {
    const persona = await this.personaModel.findOne({ email });
    return persona != null;
  }

  public async login(email: string, password: string) {
    const persona = await this.personaModel
      .findOne({ email })
      .select('+password');
    if (!persona) {
      throw new AuthError('Invalid credentials');
    }
    const isPasswordCorrect = await persona.checkPassword(password);
    if (!isPasswordCorrect) {
      throw new AuthError('Invalid credentials');
    }
    const token = createJWT({ personaId: persona._id, email });
    return { persona, token };
  }
}
