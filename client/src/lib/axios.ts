import Axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_URL } from '@/config';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = window.localStorage.getItem('token');

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const customErrors = error?.response?.data as {
      error: { message: string };
    };
    return Promise.reject(customErrors ? customErrors.error : error);
  },
);
