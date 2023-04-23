import { IAssistance, IAssistanceDto } from '@/interfaces/assistance';

export default class AssistanceMapper {
  static toDTO(assistance: IAssistance, userId: string) {
    const assistanceDto = {} as IAssistanceDto;

    assistanceDto.id = assistance._id.toString();
    assistanceDto.category = assistance.category;
    assistanceDto.status = assistance.status;
    assistanceDto.title = assistance.title;
    assistanceDto.description = assistance.description;
    assistanceDto.createdByPersona =
      assistance.authorId.toString() === userId.toString();

    return assistanceDto;
  }
}
