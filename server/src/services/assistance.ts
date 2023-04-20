import { Model } from 'mongoose';
import { BadRequestError, ForbiddenError, NotFoundError } from '@/errors';
import { IAssistance, IAssistanceDto } from '@/interfaces/assistance';

export default class AssistanceService {
  constructor(private assistanceModel: Model<IAssistance>) {}

  public async createAssistance(authorId: string, assistance: IAssistanceDto) {
    const createdAssistance = await this.assistanceModel.create({
      authorId,
      ...assistance,
      status: 'active', // TODO: enum would be a better choice
    });
    return createdAssistance;
  }

  public async getAssistances() {
    const assistances = await this.assistanceModel
      .find({})
      .sort({ createdAt: 'desc' });
    return assistances;
  }

  public async getUserAssistances(authorId: string) {
    const assistances = await this.assistanceModel
      .find({ authorId })
      .sort({ createdAt: 'desc' });
    return assistances;
  }

  public async getAssistance(assistanceId: string, authorId: string) {
    let assistance;
    try {
      assistance = await this.assistanceModel.findById(assistanceId);
    } catch (error) {
      throw new BadRequestError(
        `Could not find assistance with id ${assistanceId}`,
      );
    }

    if (!assistance) {
      throw new NotFoundError(
        `No assistance found with given id ${assistanceId} for the user ${authorId}`,
      );
    }

    const canAccess = assistance.authorId.toString() === authorId;
    if (!canAccess) {
      throw new ForbiddenError(
        `User ${authorId} does not have permission for this action`,
      );
    }
    return assistance;
  }

  public async updateAssistance(
    assitanceId: string,
    authorId: string,
    updatedAssistance: IAssistanceDto,
  ) {
    const assistance = await this.getAssistance(assitanceId, authorId);
    assistance.category = updatedAssistance.category;
    assistance.status = updatedAssistance.status;
    assistance.title = updatedAssistance.title;
    assistance.description = updatedAssistance.description;

    await assistance.save();
    return assistance;
  }
}
