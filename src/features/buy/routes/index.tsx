import { Routes, Route } from 'react-router-dom';

import { Buy } from './Buy';

export const BuyRoute = () => {
  return (
    <Routes>
      <Route index element={<Buy />} />
    </Routes>
  );
};
