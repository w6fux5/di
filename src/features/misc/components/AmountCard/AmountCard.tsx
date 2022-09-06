import { Statistic } from 'antd';

type AmountCardProps = {
  twdAmount: number;
  usdtAmount: number;
};

const containerStyle = {
  // height: '100%',
  border: '1px solid #d48806',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '1.4rem',
};

const titleStyle = {
  fontSize: '0.8rem',
  color: '#8c8c8c',
};
const valueStyle = {
  fontSize: '1rem',
  color: '#f2f2f2',
};

export const AmountCard = ({ twdAmount, usdtAmount }: AmountCardProps) => {
  return (
    <div style={{ ...containerStyle }}>
      <Statistic
        precision={2}
        title={<span style={{ ...titleStyle }}>數量</span>}
        valueStyle={{ ...valueStyle }}
        value={usdtAmount}
        suffix={<span>USDT</span>}
      />
      <Statistic
        title={<span style={{ ...titleStyle }}>總價</span>}
        valueStyle={{ ...valueStyle }}
        // precision={0}
        value={twdAmount.toFixed(-0)}
        suffix={<span>TWD</span>}
      />
    </div>
  );
};
