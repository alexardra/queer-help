import { IMessage, IMessageDto } from '@/interfaces/messaging';

export default class MessageMapper {
  static toDTO(message: IMessage) {
    const messageDto = {} as IMessageDto;

    messageDto.id = message._id;
    messageDto.chatId = message.chatId;
    messageDto.senderId = message.senderId;
    messageDto.text = message.text;
    messageDto.createdAt = message.createdAt;

    return messageDto;
  }
}
