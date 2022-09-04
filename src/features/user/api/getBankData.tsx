import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, queryKeys } from '@/lib/react-query';

export type BankDataProps = {
  User_BankStatus: number; // 101 or 102 是驗證成功，可以使用
  P1: string; // 帳號
  P2: string; // 帳戶名稱
  P3: string; // 銀行代碼
  P4: string; // city
  token: string;
};

export type BankDataType = BankDataProps[];

export const getBankData = (): Promise<BankDataType> => {
  return axios.get('/Get_UserBankSet.aspx');
};

type QueryFnType = typeof getBankData;

type CheckBalanceOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useBankData = ({ config }: CheckBalanceOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKeys['bank-data'], 'Get_UserBankSet.aspx'],
    queryFn: () => getBankData(),
  });
};

/// Get_UserBankSet.aspx
/// GetAgentAcc.aspx
