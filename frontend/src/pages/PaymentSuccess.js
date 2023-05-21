import { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentSuccess() {
  const [pgToken, setPgToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(window.location.href);
      const pg_token = url.searchParams.get('pg_token');
      setPgToken(pg_token);

      try {
        const data = {
          pg_token: pg_token,
        };
        const response = await axios.get(`http://localhost:8080/pay/${localStorage.getItem('tid')}/success`, {
          params: data,
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        localStorage.removeItem('tid');
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
