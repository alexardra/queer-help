import { IChat } from '@/interfaces/messaging';
import mongoose, { Schema } from 'mongoose';

const ChatSchema: Schema = new Schema(
  {
    assistance: {
      type: mongoose.Types.ObjectId,
      ref: 'Assistance',
      required: true,
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IChat>('Chat', ChatSchema);
