export type ParamsProps = 'session_id' | 'buy_token';

export const urlParamsKey = {
  session_id: 'session_id',
  buy_token: 'buy_token',
  //   order_token: 'order_token',
};

export const getParamsFromUrl = (params: string): string => {
  const str = `?${window.location.hash.split('?')[1]}`;
  const searchParams = new URLSearchParams(str);
  return searchParams.get(params) || '';
};
