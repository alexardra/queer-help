import mongoose from 'mongoose';
import { IAssistance, IAssistanceDto } from './assistance';

export interface IChat extends mongoose.Document {
  members: string[];
  createdAt: string;
  updatedAt: string;
  assistance: IAssistance;
}

export interface IChatDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  assistance?: IAssistanceDto;
}

export interface IMessage extends mongoose.Document {
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export interface IMessageDto {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
}
