import { Result as AntdResult } from 'antd';

import img from '@/assets/i_01.png';

interface WaitProps {
  hash: string;
}

export const Wait = ({ hash }: WaitProps) => {
  const titleEl = <span style={{ color: 'white', fontSize: '1.5rem' }}>等待對方確認收款</span>;

  const subTitleEl = (
    <div style={{ color: '#bfbfbf', fontSize: '0.8rem' }}>
      <span>{`交易回執: ${hash}`}</span>
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
