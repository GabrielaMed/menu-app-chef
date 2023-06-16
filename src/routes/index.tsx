import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { OrderDetails } from '../pages/OrderDetails';

export const AppRoutes = () => (
  <Routes>
    <Route path='/:companyIdURL' element={<Home />} />
    <Route path='/' element={<Home />} />
    <Route path='/orderDetails' element={<OrderDetails />} />
  </Routes>
);
