import { toNumber } from 'lodash';

export const getIntNumber = (value: string | number): number => {
  const num = toNumber(value);
  return num;
};

type GetIntTotalAmountProps = {
  rate: string | undefined;
  amount: string | number;
};

export const getIntTotalAmount = ({ rate, amount }: GetIntTotalAmountProps): number => {
  if (!rate) return NaN;

  const rateNum = getIntNumber(rate);
  const amountNum = getIntNumber(amount);
  const total = rateNum * amountNum;
  const int = total.toFixed(0);
  const totalAmountNum = toNumber(int);
  return totalAmountNum;
};

export const thousandthsFormatWithSymbolAndToFixed = ({
  value,
  type,
}: {
  value: number | undefined;
  type: 'twd' | 'usdt';
}): string => {
  const transfer = Number(value).toFixed(2);
  let symbol = '';
  if (type === 'twd') {
    symbol = '$';
  }
  if (type === 'usdt') {
    symbol = '₮';
  }
  const str = `${symbol} ${transfer}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return str;
};
