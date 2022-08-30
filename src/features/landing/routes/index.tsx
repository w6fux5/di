import { Route, Routes } from 'react-router-dom';

// import { useAuth } from '@/features/auth';

import { Landing } from '../components/Landing';

export const LandingRoute = () => {
  // const navigate = useNavigate();
  // const { user } = useAuth();

  // useEffect(() => {
  //   if (user) {
  //     navigate('/home');
  //   }
  // }, [user, navigate]);
  return (
    <Routes>
      <Route index element={<Landing />} />
    </Routes>
  );
};
