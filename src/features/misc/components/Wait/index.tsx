import { Result as AntdResult } from 'antd';

import img from '@/assets/i_01.png';

interface WaitProps {
  hash: string;
}

export const Wait = ({ hash }: WaitProps) => {
  const titleEl = <span style={{ color: 'white' }}>已提交</span>;

  const subTitleEl = (
    <div style={{ color: 'white' }}>
      <p>{`交易回執: ${hash}`}</p>
      <p>交易成功後，數字貨幣預計15～30分鐘到達分鐘到達你的錢包地址</p>
    </div>
  );
  return (
    <AntdResult
      icon={<img src={img} alt="已提交" />}
      status="info"
      title={titleEl}
      subTitle={subTitleEl}
    />
  );
};
