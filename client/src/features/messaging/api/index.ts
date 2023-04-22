import { axios } from '@/lib/axios';
import { AxiosResponse } from 'axios';

export type Chat = {
  id: string;
  createdAt: string;
  updatedAt: string;
  members: string[];
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
