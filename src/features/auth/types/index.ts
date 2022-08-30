export type AuthUser = {
  isAgent: boolean;
  login_session: string;
};

export type UserResponse = {
  code: number;
  data: AuthUser;
  msg: string;
};
