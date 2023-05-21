import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentSuccess from './pages/PaymentSuccess';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/payment/success' element={<PaymentSuccess />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
