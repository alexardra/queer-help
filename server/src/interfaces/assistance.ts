import mongoose from 'mongoose';

// export type AssistanceStatus = 'ongoing' | 'done' | 'canceled';

export interface IAssistance {
  _id: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  category: string;
  status: string;
  title: string;
  description: string;
}

export interface IAssistanceDto {
  id: string;
  category: string;
  status: string;
  title: string;
  description: string;
}
