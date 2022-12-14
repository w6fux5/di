import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, queryKeys } from '@/lib/react-query';

export type CheckBalanceTypes = {
  Real_Balance: number;
  Avb_Balance: number;
  AgtBalance: number;
  Lvl: number;
};

export const checkBalance = (): Promise<CheckBalanceTypes> => {
  return axios.get('/ChkBalance.aspx');
};

type QueryFnType = typeof checkBalance;

type CheckBalanceOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useCheckBalance = ({ config }: CheckBalanceOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKeys['check-balance'], '/ChkBalance.aspx'],
    queryFn: () => checkBalance(),
    staleTime: 0,
    cacheTime: 0,
  });
};
