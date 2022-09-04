/* eslint-disable no-param-reassign */
import Axios, { AxiosRequestConfig } from 'axios';

import { errorMessage } from '@/config/error-message';
import storage from '@/utils/storage';
import { getParamsFromUrl } from '@/utils/urlParse';

import { useToast } from '../toast';

const authRequestInterceptor = (config: AxiosRequestConfig) => {
  const userToken = storage.getToken();
  if (userToken && config?.headers) {
    config.headers.login_session = `${userToken}`;
    config.headers.Accept = 'application/json';
  }

  const sessionID = getParamsFromUrl('session_id');

  if (sessionID && config?.headers) {
    config.headers.dp_order = sessionID;
  }

  return config;
};

export const axios = Axios.create({
  baseURL: '/j',
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  (error) => {
    const message = error.response?.data?.msg || error.message;
    const code = error.response?.data?.code || error.code;

    useToast({ type: 'error', code, message });

    const customMessage = errorMessage[code];

    let responseMessage = customMessage || message;

    if (error.response.status >= 500) {
      responseMessage = 'SERVER 錯誤';
    }

    // return Promise.reject(error);
    return Promise.reject(responseMessage);
  },
);
