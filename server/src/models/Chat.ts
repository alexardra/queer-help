import { IChat } from '@/interfaces/messaging';
import mongoose, { Schema } from 'mongoose';

const ChatSchema: Schema<IChat> = new Schema(
  {
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IChat>('Chat', ChatSchema);
