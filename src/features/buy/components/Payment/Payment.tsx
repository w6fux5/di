import { Button, Descriptions, Typography } from 'antd';

import { ExRateDivider } from '@/features/exRate';
import { AmountCard } from '@/features/misc';
import { OrderDataTypes } from '@/types/OrderTypes';
import { getParamsFromUrl, urlParamsKey } from '@/utils/urlParse';

import { useBuyMatch2 } from '../../api/buyMatch2';

const { Text } = Typography;

interface PaymentProps {
  receivedData: OrderDataTypes;
}

const buyOrderTokenKey = urlParamsKey.buy_token;

const labelStyle = {
  color: '#bfbfbf',
};

const contentStyle = {
  color: '#f5f5f5',
};

export const Payment = ({ receivedData }: PaymentProps) => {
  const {
    // D1: exRate,
    D2: twdAmount,
    UsdtAmt: usdtAmount,
    P2: name,
    P1: account,
    P3: bankCode,
  } = receivedData;

  const buyOrderToken = getParamsFromUrl(buyOrderTokenKey);

  const { refetch, isLoading } = useBuyMatch2({
    config: { enabled: false },
    data: { buyOrderToken },
  });

  const confirmPay = () => {
    if (!buyOrderToken) {
      alert('沒有購買的訂單編號');
      return;
    }
    refetch();
  };

  return (
    <section
      style={{
        maxWidth: '450px',
        width: '90%',
      }}
    >
      <Descriptions
        column={1}
        labelStyle={{ ...labelStyle }}
        contentStyle={{ ...contentStyle }}
        title={<span style={{ color: '#f2f2f2' }}>付款資訊</span>}
      >
        <Descriptions.Item label="銀行代碼">
          <Text copyable style={{ color: 'white' }}>
            {bankCode}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="戶名">
          <Text copyable style={{ color: 'white' }}>
            {name}
          </Text>
        </Descriptions.Item>
        <Descriptions.Item label="銀行帳號">
          <Text copyable style={{ color: 'white' }}>
            {account}
          </Text>
        </Descriptions.Item>
      </Descriptions>

      <ExRateDivider />
      <AmountCard twdAmount={twdAmount} usdtAmount={usdtAmount} />

      <Button
        block
        style={{ marginTop: '1rem' }}
        onClick={confirmPay}
        loading={isLoading}
        type="primary"
      >
        已完成付款
      </Button>
    </section>
  );
};
