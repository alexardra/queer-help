import { IMessage } from '@/interfaces/messaging';
import mongoose, { Schema } from 'mongoose';

const MessageSchema: Schema = new Schema(
  {
    chatId: {
      type: mongoose.Types.ObjectId,
      ref: 'Chat',
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Cannot send empty message'],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IMessage>('Message', MessageSchema);
