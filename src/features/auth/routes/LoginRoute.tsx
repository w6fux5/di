import { Space, Alert } from 'antd';
import Marquee from 'react-fast-marquee';

import logo from '@/assets/88u_logo.png';
import { Loading } from '@/components/Loading';
import { TransactionInfo, usePaymentInfo } from '@/features/user';
import { useRedirect } from '@/hooks/useRedirect';

import { LoginForm } from '../components/LoginForm';

export const LoginRoute = () => {
  // 付款資訊 api
  const { data: paymentInfo, isLoading: paymentInfoLoading } = usePaymentInfo();
  const { redirect } = useRedirect({ location: '/home' });
  const onSuccess = () => {
    redirect();
  };

  if (paymentInfoLoading) {
    return <Loading />;
  }

  return (
    <Space size="small" direction="vertical" style={{ backgroundColor: '' }}>
      <Alert
        style={{}}
        banner
        message={
          <Marquee pauseOnHover gradient={false}>
            此訂單有效時限為2小時，請在有效時限內完成交易，如訂單失效，請重新申請支付。
          </Marquee>
        }
      />
      <img style={{ width: '8rem' }} src={logo} alt="88u logo" />
      {/* <div style={{ fontSize: '1.5rem' }}>使用 88U ASIA 支付</div> */}
      <div style={{ margin: '5px 0 2rem 0' }}>簡易 | 快速 | 24H即時交易到帳</div>
      <LoginForm onSuccess={onSuccess} />
      <TransactionInfo paymentInfo={paymentInfo} />
    </Space>
  );
};
