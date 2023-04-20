import mongoose from 'mongoose';

export type AssistanceStatusType = 'active' | 'done' | 'canceled';

export interface IAssistance {
  _id: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  category: string;
  status: AssistanceStatusType;
  title: string;
  description: string;
}

export interface IAssistanceDto {
  id: string;
  category: string;
  status: AssistanceStatusType;
  title: string;
  description: string;
}
