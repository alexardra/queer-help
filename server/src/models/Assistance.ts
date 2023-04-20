import mongoose, { Schema } from 'mongoose';
import { IAssistance } from '@/interfaces/assistance';

const AssistanceSchema: Schema = new Schema(
  {
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: {
        values: [
          'Doctor consultation',
          'Legal consultation',
          'Financial advise',
          'Technical support',
          'Educational advise',
          'Help with specific item',
        ],
      },
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['ongoing', 'done', 'canceled'],
      },
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IAssistance>('Assistance', AssistanceSchema);
