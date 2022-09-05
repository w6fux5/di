import { SwapOutlined } from '@ant-design/icons';
import { Result, Statistic } from 'antd';

import searchIcon from '@/assets/icon_search.gif';

type MatchingProps = {
  price: number;
  usdt: number;
};

const valueStyle = {
  color: 'white',
  fontSize: '0.9rem',
};

export const Matching = ({ price, usdt }: MatchingProps) => {
  return (
    <Result
      style={{ color: 'white' }}
      icon={<img src={searchIcon} alt="search" />}
      // title="請稍等，現正整合交易者資料"
      title={<span style={{ ...valueStyle, fontSize: '2rem' }}>請稍等，現正整合交易者資料</span>}
      subTitle={
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <span style={{ ...valueStyle, lineHeight: 1 }}>購賣訂單</span>
          <Statistic valueStyle={{ ...valueStyle }} suffix="USDT" value={usdt} />
          <SwapOutlined style={{ ...valueStyle }} />
          <Statistic valueStyle={{ ...valueStyle }} prefix="$" suffix="TWD" value={price} />
        </div>
      }
    />
  );
};
