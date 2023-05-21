import './App.css';

import axios from 'axios';

function App() {
  // const socialLogin = () => {
  //   axios
  //     .post('http://localhost:8080/payment/ready')
  //     .then((response) => {
  //       console.log(response);
  //       window.open(response.data.next_redirect_pc_url, 'popup', 'width=600,height=600');
  //       // 필요한 추가 작업을 여기에 작성하세요.
  //     })
  //     .catch((error) => {
  //       console.error('There was an error!', error);
  //     });
  // };

  const sendData = async () => {
    try {
      const data = {
        orderId: '123',
        memberId: 5,
        itemName: '오소유_체리박스',
        quantity: 3,
        price: 1000,
      };

      const response = await axios.post('http://localhost:8080/pay/ready', data);
      console.log(response.data);
      window.open(response.data.next_redirect_pc_url, 'popup', 'width=600,height=600');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={() => sendData()}>
          <img src={require('./payment_icon_yellow_large.png')} className='payButton' alt='logo'></img>
        </button>
      </header>
    </div>
  );
}

export default App;
