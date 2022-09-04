import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, queryKeys } from '@/lib/react-query';

type OrderTransfer = {
  order_token: string;
};

export type RequestData = {
  dpOrderSession: string;
};

const orderTransfer = (data: RequestData): Promise<OrderTransfer> => {
  return axios.post('/DP_OrderTransfer.aspx', { dp_order: data.dpOrderSession });
};

type QueryFnType = typeof orderTransfer;

type OrderTransferOptions = {
  config?: QueryConfig<QueryFnType>;
  data: RequestData;
};

export const useOrderTransfer = ({ config, data }: OrderTransferOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKeys['order-transfer'], '/DP_OrderTransfer.aspx'],
    queryFn: () => orderTransfer(data),
  });
};
