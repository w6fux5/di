import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, queryKeys } from '@/lib/react-query';

type BuyMatch1Data = {
  order_token: string;
};

export type RequestData = {
  ClientName: string; // P2 name | P1 account | P3 bankCode
  UsdtAmt: number | undefined;
};

export const buyMatch1 = (data: RequestData): Promise<BuyMatch1Data> => {
  return axios.post('/Req_Buy1.aspx', data);
};

type QueryFnType = typeof buyMatch1;

type BuyMatch1Options = {
  config?: QueryConfig<QueryFnType>;
  data: RequestData;
};

export const useBuyMatch1 = ({ data, config }: BuyMatch1Options) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKeys['buy-match1'], '/Req_Buy1.aspx'],
    queryFn: () => buyMatch1(data),
  });
};
