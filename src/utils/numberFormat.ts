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
