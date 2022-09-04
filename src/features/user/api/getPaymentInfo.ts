import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, queryKeys } from '@/lib/react-query';

export type PaymentInfoTypes = {
  RequestDate: string;
  USDTAmt: number;
  WalletAddress: string;
};

export const getPaymentInfo = (): Promise<PaymentInfoTypes> => {
  return axios.post('/DP_OrderDetail.aspx');
};

type QueryFnType = typeof getPaymentInfo;

type GetPaymentInfoOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const usePaymentInfo = ({ config }: GetPaymentInfoOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: [queryKeys['payment-info'], '/DP_OrderDetail.aspx'],
    queryFn: () => getPaymentInfo(),
    ...config,
  });
};
