import { Route, Routes } from 'react-router-dom';

import { AuthLayout } from '@/components/Layout';

import { LoginRoute } from './Login.route';
import { RegisterRoute } from './Register.route';

export const AuthRoutes = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path="login" element={<LoginRoute />} />
        <Route path="register" element={<RegisterRoute />} />
      </Routes>
    </AuthLayout>
  );
};
