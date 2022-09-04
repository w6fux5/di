/* eslint-disable @typescript-eslint/naming-convention */
import { initReactQueryAuth } from 'react-query-auth';

import { Loading } from '@/components/Loading';
import storage from '@/utils/storage';

import { loginReq, LoginCredentialsDTO } from '../api/Login';
import { AuthUser, UserResponse } from '../types';

const handleUserResponse = async (data: UserResponse) => {
  const { login_session } = data;
  storage.setToken(login_session);
  return data;
};

const loginFn = async (data: LoginCredentialsDTO) => {
  const response = await loginReq(data);
  const user = await handleUserResponse(response);
  return user;
};

const registerFn = async (data: LoginCredentialsDTO) => {
  const response = await loginReq(data);
  const user = await handleUserResponse(response);
  return user;
};

const loadUser = async () => {
  if (storage.getToken()) {
    return storage.getToken();
  }
  return null;
};

const logoutFn = async () => {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
};

const authConfig = {
  loginFn,
  loadUser,
  logoutFn,
  registerFn,
  LoaderComponent() {
    return <Loading />;
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser,
  Error,
  LoginCredentialsDTO
  //   RegisterCredentialsDTO
>(authConfig);
