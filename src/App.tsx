import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalContextProvider } from './shared/GlobalContext';

const App = () => (
  <Router>
    <GlobalContextProvider>
      <AppRoutes />
    </GlobalContextProvider>
  </Router>
);

export default App;
