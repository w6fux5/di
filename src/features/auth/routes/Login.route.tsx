import { LoginForm } from '../components/LoginForm';

export const LoginRoute = () => {
  return <LoginForm onSuccess={() => console.log('login success')} />;
};
