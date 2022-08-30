import { AppProvider } from '@/providers/AppProvider';
import { AppRoutes } from '@/routes';

export const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};
