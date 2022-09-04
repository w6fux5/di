export type ParamsProps = 'session_id' | 'buy_token';

export const urlParamsKey = {
  session_id: 'session_id',
  buy_token: 'buy_token',
  //   order_token: 'order_token',
};

export const getParamsFromUrl = (params: string): string => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(params) || '';
};
