import { Space } from 'antd';

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
    <Space direction="vertical">
      <LoginForm onSuccess={onSuccess} />
      <TransactionInfo paymentInfo={paymentInfo} />
    </Space>
  );
};
