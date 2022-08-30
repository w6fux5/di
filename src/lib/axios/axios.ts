/* eslint-disable no-param-reassign */
import Axios, { AxiosRequestConfig } from 'axios';

import storage from '@/utils/storage';

const authRequestInterceptor = (config: AxiosRequestConfig) => {
  const token = storage.getToken();
  if (token && config.headers) {
    config.headers.login_session = `${token}`;
    config.headers.Accept = 'application/json';
  }
  return config;
};

export const axios = Axios.create({
  baseURL: '/j',
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.msg || error.message;
    alert(message);
    console.log(error);
    return Promise.reject(error);
  }
);
