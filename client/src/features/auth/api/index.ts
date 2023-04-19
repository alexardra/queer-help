import { axios } from '@/lib/axios';
import { AxiosError, AxiosResponse } from 'axios';

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

export type PersonaLoginResponse = {
  persona: PersonaCredentials;
  token: string;
};

type CustomError = {
  error: { message: string };
};

export const fetchPersona = (): Promise<PersonaCredentials> => {
  return axios.get('/auth/me');
};

export const loginUser = (
  credentials: PersonaLoginRequest,
): Promise<PersonaLoginResponse> => {
  return axios
    .post('/user/login', credentials)
    .then((response: AxiosResponse) => response.data as PersonaLoginResponse)
    .catch((error: AxiosError) => {
      const customErrors = error?.response?.data as CustomError;
      if (customErrors) {
        throw new Error(customErrors.error.message);
      }
      throw error;
    });
};

export const loginAdmin = (
  credentials: PersonaLoginRequest,
): Promise<PersonaLoginResponse> => {
  return axios
    .post('/admin/login', credentials)
    .then((response: AxiosResponse) => response.data as PersonaLoginResponse)
    .catch((error: AxiosError) => {
      const customErrors = error?.response?.data as CustomError;
      if (customErrors) {
        throw new Error(customErrors.error.message);
      }
      throw error;
    });
};
