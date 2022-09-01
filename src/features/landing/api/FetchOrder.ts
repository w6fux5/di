import { UserResponse } from '@/features/auth';
import { axios } from '@/lib/axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FetchOrder = (data: any) => async (): Promise<UserResponse> => {
  // eslint-disable-next-line @typescript-eslint/return-await
  return await axios.post('/ChkBalance.aspx');
};
