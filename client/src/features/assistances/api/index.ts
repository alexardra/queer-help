import axios, { AxiosResponse } from 'axios';

export type Assistance = {
  category: string;
  status: string;
  title: string;
  description: string;
};

export const getAssistances = (): Promise<Assistance[]> => {
  return axios
    .get('/assistances')
    .then((response: AxiosResponse) => response.data as Assistance[]);
};

export const createAssistance = (assistance: Assistance) => {
  return axios.post('/assistances', assistance);
};
