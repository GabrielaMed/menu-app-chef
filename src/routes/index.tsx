import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';

export const AppRoutes = () => (
  <Routes>
    <Route path='/:companyIdURL' element={<Home />} />
    <Route path='/' element={<Home />} />
  </Routes>
);
