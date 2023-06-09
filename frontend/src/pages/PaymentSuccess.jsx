import { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentSuccess() {
  const [pgToken, setPgToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(window.location.href);
      const pgToken = url.searchParams.get('pg_token');
      const partnerOrderId = url.searchParams.get('partner_order_id');
      setPgToken(pgToken);

      try {
        const data = {
          'pg-token': pgToken,
          'partner-order-id': partnerOrderId,
        };
        const response = await axios.get(`http://greencherry.store:2001/pay/success`, {
          params: data,
        });
        console.log(response);
        localStorage.setItem('paymentCompleted', 'true');
      } catch (error) {
        console.error(error);
        localStorage.setItem('paymentCompleted', 'false');
      }
    };
    fetchData();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Payment Success</h1>
        <p>{pgToken}</p>
      </header>
    </div>
  );
}

export default PaymentSuccess;
