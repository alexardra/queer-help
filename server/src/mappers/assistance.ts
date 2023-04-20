import { IAssistance, IAssistanceDto } from '@/interfaces/assistance';

export default class AssistanceMapper {
  static toDTO(assistance: IAssistance) {
    const assistanceDto = {} as IAssistanceDto;

    assistanceDto.id = assistance._id.toString();
    assistanceDto.category = assistance.category;
    assistanceDto.status = assistance.status;
    assistanceDto.title = assistance.title;
    assistanceDto.description = assistance.description;

    return assistanceDto;
  }
}
