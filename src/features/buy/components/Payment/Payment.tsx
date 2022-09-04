import { Button } from 'antd';

import { getParamsFromUrl, urlParamsKey } from '../../../../utils/urlParse';
import { useBuyMatch2 } from '../../api/buyMatch2';
import { OrderDataTypes } from '../../types';

interface PaymentProps {
  receivedData: OrderDataTypes;
}

const buyOrderTokenKey = urlParamsKey.buy_token;

export const Payment = ({ receivedData }: PaymentProps) => {
  const buyOrderToken = getParamsFromUrl(buyOrderTokenKey);
  const { refetch, isLoading } = useBuyMatch2({
    config: { enabled: false },
    data: { buyOrderToken },
  });

  const confirmPay = () => {
    if (!buyOrderToken) {
      alert('no order token');
      return;
    }
    refetch();
  };

  return (
    <div>
      <h1>Payment Info</h1>
      <p>匯率： {receivedData?.D1}</p>
      <p>付款金額： {receivedData?.D2}</p>
      <p>USDT數量： {receivedData?.UsdtAmt}</p>
      <p>戶名： {receivedData?.P2}</p>
      <p>銀行帳號： {receivedData?.P1}</p>
      <p>銀行代碼： {receivedData?.P3}</p>
      <Button onClick={confirmPay} loading={isLoading} type="primary">
        確認付款
      </Button>
    </div>
  );
};
