import { axios } from '@/lib/axios';

import { UserResponse } from '../types';

export type LoginCredentialsDTO = {
  Login_tel: string;
  Login_pwd: string;
};

export type RegisterCredentialsDTO = {
  Login_tel: string;
  Login_pwd: string;
};

export const loginReq = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post('/login.aspx', {
    ...data,
    Login_countrycode: '886',
  });
};
