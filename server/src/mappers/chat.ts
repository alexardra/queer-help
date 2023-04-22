import { IChat, IChatDto } from '@/interfaces/messaging';

export default class ChatMapper {
  static toDTO(chat: IChat) {
    const chatDto = {} as IChatDto;

    chatDto.id = chat._id;
    chatDto.createdAt = chat.createdAt;

    return chatDto;
  }
}
