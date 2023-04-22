import mongoose from 'mongoose';

export interface IChat extends mongoose.Document {
  members: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IChatDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessage extends mongoose.Document {
  chatId: string;
  senderId: string;
  text: string;
}
