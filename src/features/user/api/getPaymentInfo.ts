import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, queryKeys } from '@/lib/react-query';

type PaymentInfo = {
  RequestDate: string;
  USDTAmt: number;
  WalletAddress: string;
};

export const getPaymentInfo = (): Promise<PaymentInfo> => {
  return axios.post('/DP_OrderDetail.aspx');
};

type QueryFnType = typeof getPaymentInfo;

type GetPaymentInfoOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const usePaymentInfo = ({ config }: GetPaymentInfoOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKeys['payment-info'], '/DP_OrderDetail.aspx'],
    queryFn: () => getPaymentInfo(),
  });
};
