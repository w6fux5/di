import { Descriptions, Typography, Statistic } from 'antd';
import { isNumber } from 'lodash';

import { CheckBalanceTypes, PaymentInfoTypes } from '../../api';

const { Text } = Typography;

const labelStyle = {
  color: '#bfbfbf',
};
const contentStyle = {
  color: '#f5f5f5',
};

const labelStyleLight = {
  color: 'black',
};

const contentStyleLight = {
  color: 'black',
};

interface TransactionDescriptionProps {
  paymentInfo: PaymentInfoTypes;
  balance?: CheckBalanceTypes;
  finalBalance?: number;
  light?: boolean;
}

const defaultProps = {
  finalBalance: null,
  balance: null,
  light: false,
};

export const TransactionDescription = ({
  balance,
  paymentInfo,
  finalBalance,
  light,
}: TransactionDescriptionProps) => {
  const labelCommonStyle = light ? labelStyleLight : labelStyle;
  const contentCommonStyle = light ? contentStyleLight : contentStyle;

  return (
    <Descriptions
      column={1}
      labelStyle={{ ...labelCommonStyle }}
      contentStyle={{ ...contentCommonStyle }}
      title={<span style={{ color: light ? 'black' : '#f2f2f2' }}>訂單資訊</span>}
    >
      {isNumber(balance?.AgtBalance) && (
        <Descriptions.Item label="可提餘額(USDT)">
          <Statistic valueStyle={{ ...contentCommonStyle }} value={balance?.AgtBalance} />
        </Descriptions.Item>
      )}

      <Descriptions.Item label="支付數量(USDT)">
        <Statistic
          valueStyle={{ ...contentCommonStyle, color: '#40a9ff' }}
          value={paymentInfo?.USDTAmt}
        />
      </Descriptions.Item>

      {isNumber(finalBalance) && (
        <Descriptions.Item label="結餘(USDT)">
          <Statistic
            valueStyle={{ color: finalBalance && finalBalance < 0 ? '#cf1322' : '#bfbfbf' }}
            value={finalBalance}
          />
        </Descriptions.Item>
      )}

      <Descriptions.Item label="訂單成立時間">{paymentInfo?.RequestDate}</Descriptions.Item>

      <Descriptions.Item label="TRC20轉帳地址">
        <Text copyable style={{ ...contentCommonStyle }}>
          {paymentInfo?.WalletAddress}
        </Text>
      </Descriptions.Item>
    </Descriptions>
  );
};

TransactionDescription.defaultProps = defaultProps;
