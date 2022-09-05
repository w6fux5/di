import { useRedirect } from '../../../hooks/useRedirect';
import { LoginForm } from '../components/LoginForm';

export const LoginRoute = () => {
  const { redirect } = useRedirect({ location: '/home' });
  const onSuccess = () => {
    redirect();
  };
  return <LoginForm onSuccess={onSuccess} />;
};
