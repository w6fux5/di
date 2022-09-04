import { Route, Routes } from 'react-router-dom';

import { Loading } from '@/components/Loading';
import { Error } from '@/features/misc';
import { usePaymentInfo } from '@/features/user';

import { LoginRoute } from './LoginRoute';

type ErrorProps = {
  message: string;
};

export const AuthRoutes = () => {
  const { error, isError, isSuccess } = usePaymentInfo();

  if (isError) {
    const err = error as ErrorProps;
    return <Error title={err.message} />;
  }

  if (isSuccess) {
    return (
      <Routes>
        <Route index element={<LoginRoute />} />
      </Routes>
    );
  }

  return <Loading />;
};
