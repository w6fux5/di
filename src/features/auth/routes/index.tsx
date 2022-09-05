import { Route, Routes } from 'react-router-dom';

import { Loading } from '@/components/Loading';
import { usePaymentInfo } from '@/features/user';

import { LoginRoute } from './LoginRoute';

export const AuthRoutes = () => {
  const { isSuccess } = usePaymentInfo();

  if (isSuccess) {
    return (
      <Routes>
        <Route index element={<LoginRoute />} />
      </Routes>
    );
  }

  return <Loading />;
};
