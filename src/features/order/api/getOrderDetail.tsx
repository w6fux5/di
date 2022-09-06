import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, queryKeys } from '@/lib/react-query';
import { OrderDataTypes } from '@/types/OrderTypes';

export type RequestData = {
  Token: string;
};

export const getOrderDetail = (data: RequestData): Promise<OrderDataTypes> => {
  return axios.post('/GetTxDetail.aspx', data);
};

type QueryFnType = typeof getOrderDetail;

type GetOrderDetailOptions = {
  config?: QueryConfig<QueryFnType>;
  data: RequestData;
};

export const useGetOrderDetail = ({ data, config }: GetOrderDetailOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKeys['get-order-detail'], '/GetTxDetail.aspx'],
    queryFn: () => getOrderDetail(data),
  });
};
