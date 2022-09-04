import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, queryKeys } from '@/lib/react-query';

export type ExRateProps = {
  RMB_BUY: string;
  RMB_SELL: string;
  TransferHandle: string;
  TransferHandle2: string;
};

export const checkExRate = (): Promise<ExRateProps> => {
  return axios.get('/ChkExRate.aspx');
};

type QueryFnType = typeof checkExRate;

type CheckExRateOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useExRate = ({ config }: CheckExRateOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKeys['check-exRate'], '/ChkExRate.aspx'],
    queryFn: () => checkExRate(),
  });
};
