/* eslint-disable no-param-reassign */
import Axios, { AxiosRequestConfig } from 'axios';

import { errorMessage } from '@/config/error-message';
import { useHttpErrorStore } from '@/stores/httpErrorStore';
import storage from '@/utils/storage';
import { getParamsFromUrl, urlParamsKey } from '@/utils/urlParse';

const authRequestInterceptor = (config: AxiosRequestConfig) => {
  const userToken = storage.getToken();
  if (userToken && config?.headers) {
    config.headers.login_session = `${userToken}`;
    config.headers.Accept = 'application/json';
  }

  const sessionID = getParamsFromUrl(urlParamsKey.session_id);

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

    const customMessage = errorMessage[code];
    const responseMessage = customMessage || message;

    if (code === '10') {
      alert(responseMessage);
    }

    useHttpErrorStore.getState().addHttpError({
      code,
      message: responseMessage,
    });

    return Promise.reject(responseMessage);
  },
);
