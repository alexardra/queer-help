import { axios } from '@/lib/axios';
import { AxiosResponse } from 'axios';

export type PersonaCredentials = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
};

export type PersonaLoginRequest = {
  email: string;
  password: string;
};

export type PersonaAuthResponse = {
  persona: PersonaCredentials;
  token: string;
};

export type UserRegisterRequest = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  referenceLinks: string;
  personalNumber: number;
};

export const fetchPersona = (): Promise<PersonaCredentials> => {
  return axios.get('/auth/me');
};

export const loginUser = (
  credentials: PersonaLoginRequest,
): Promise<PersonaAuthResponse> => {
  return axios
    .post('/user/login', credentials)
    .then((response: AxiosResponse) => response.data as PersonaAuthResponse);
};

export const loginAdmin = (
  credentials: PersonaLoginRequest,
): Promise<PersonaAuthResponse> => {
  return axios
    .post('/admin/login', credentials)
    .then((response: AxiosResponse) => response.data as PersonaAuthResponse);
};

export const registerUser = (
  data: UserRegisterRequest,
): Promise<PersonaAuthResponse> => {
  return axios
    .post('/user/register', data)
    .then((response: AxiosResponse) => response.data as PersonaAuthResponse);
};
