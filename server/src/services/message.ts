import { IMessage } from '@/interfaces/messaging';
import { Model } from 'mongoose';

export default class MessageService {
  constructor(private messageModel: Model<IMessage>) {}

  public async createMessage(chatId: string, senderId: string, text: string) {
    const message = await this.messageModel.create({
      chatId,
      senderId,
      text,
    });
    return message;
  }

  public async getMessages(chatId: string) {
    const messages = await this.messageModel.find({ chatId });
    return messages;
  }
}
