import mongoose, { Schema } from 'mongoose';
import {
  AssistanceCategory,
  AssistanceStatus,
  IAssistance,
} from '@/interfaces/assistance';

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
          AssistanceCategory.DOCTOR_CONSULTATION,
          AssistanceCategory.LEGAL_CONSULTATION,
          AssistanceCategory.FINANCIAL_ADVISE,
          AssistanceCategory.TECHNICAL_SUPPORT,
          AssistanceCategory.EDUCATIONAL_ADVISE,
          AssistanceCategory.HELP_WITH_SPECIFIC_ITEM,
        ],
      },
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: [
          AssistanceStatus.ACTIVE,
          AssistanceStatus.DONE,
          AssistanceStatus.CANCELED,
        ],
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
