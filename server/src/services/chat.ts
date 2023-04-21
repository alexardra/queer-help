import { IChat, IMessage } from '@/interfaces/messaging';
import mongoose, { Model } from 'mongoose';

export default class ChatService {
  constructor(
    private chatModel: Model<IChat>,
    private messageModel: Model<IMessage>,
  ) {}

  public async createChat(
    senderId: string,
    receiverId: string,
    message: string,
  ) {
    const session = await mongoose.connection.startSession();
    let chat;
    await session.withTransaction(async () => {
      try {
        [chat] = await this.chatModel.create(
          [
            {
              members: [senderId, receiverId],
            },
          ],
          { session },
        );
        if (!chat) {
          throw new Error('Could not create chat');
        }
        await this.messageModel.create(
          [
            {
              chatId: chat._id,
              text: message,
              senderId,
            },
          ],
          { session },
        );
      } catch (error) {
        await session.abortTransaction();
      } finally {
        await session.commitTransaction();
        session.endSession();
      }
    });
    return chat;
  }

  public async getUserChats(userId: string) {
    const chats = await this.chatModel.find({
      members: { $in: [userId] },
    });
    return chats;
  }

  public async chatExists(chatId: string, userId: string) {
    try {
      const chat = await this.chatModel.findById(chatId);

      return !!chat && chat.members.includes(userId);
    } catch {
      return false;
    }
  }
}
