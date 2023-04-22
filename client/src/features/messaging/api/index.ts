import { Assistance } from '@/features/assistances/api';
import { axios } from '@/lib/axios';
import { AxiosResponse } from 'axios';

export type Chat = {
  id: string;
  createdAt: string;
  members: string[];
  assistance?: Assistance;
};

export type MessageType = {
  id: string;
  createdAt: string;
  chatId: string;
  senderId: string;
  text: string;
};

export type FetchChatsResponse = {
  chats: Chat[];
  count: number;
};

export type FetchMessagesResponse = {
  messages: MessageType[];
};

export const createChat = (data: {
  assistanceId: string;
  message: string;
}): Promise<Chat> => {
  return axios.post('/chats', data).then((response: AxiosResponse) => {
    const { chat } = response.data as { chat: Chat };
    return chat;
  });
};

export const fetchChats = (): Promise<FetchChatsResponse> => {
  return axios
    .get('/chats')
    .then((response: AxiosResponse) => response.data as FetchChatsResponse);
};

export const createMessage = (data: { chatId: string; text: string }) => {
  return axios.post('/messages', data);
};

export const getMessages = (chatId: string): Promise<FetchMessagesResponse> => {
  return axios
    .get(`/messages/${chatId}`)
    .then((response: AxiosResponse) => response.data as FetchMessagesResponse);
};
