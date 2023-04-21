import mongoose from 'mongoose';

export interface IChat extends mongoose.Document {
  members: string[];
}

export interface IMessage extends mongoose.Document {
  chatId: string;
  senderId: string;
  text: string;
}
