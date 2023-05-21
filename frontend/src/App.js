import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentSuccess from './pages/PaymentSuccess';
import Home from './pages/Home';
import Order from './pages/Order';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/payment/success' element={<PaymentSuccess />} />
        <Route path='*' element={<Home />} />
        <Route path='/order' element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
