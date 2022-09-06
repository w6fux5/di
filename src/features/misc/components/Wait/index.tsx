import { Result as AntdResult, Alert } from 'antd';
import Marquee from 'react-fast-marquee';

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
    <div>
      <AntdResult
        icon={<img src={img} alt="已提交" />}
        status="info"
        title={titleEl}
        subTitle={subTitleEl}
      />
      <Alert
        style={{ width: '80%', margin: 'auto' }}
        banner
        message={
          <Marquee pauseOnHover gradient={false}>
            交易進行中，請勿關閉網頁，否則可能導致交易失敗
          </Marquee>
        }
      />
    </div>
  );
};
