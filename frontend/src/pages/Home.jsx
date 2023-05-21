import axios from 'axios';

function Home() {
  const sendData = async () => {
    try {
      const data = {
        orderId: '123',
        memberId: 5,
        itemName: '이채은_체리박스',
        quantity: 3,
        price: 1000,
      };
      const response = await axios.post('http://localhost:8080/pay/ready', data);

      console.log(response.data);
      // window.open(response.data.next_redirect_mobile_url, 'popup', 'width=600,height=600');
      window.location.href = response.data.next_redirect_mobile_url;
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

export default Home;
