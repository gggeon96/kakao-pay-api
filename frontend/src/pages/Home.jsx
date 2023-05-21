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
      const response = await axios.post('http://greencherry.store:2001/pay/ready', data);
      localStorage.setItem('tid', response.data.tid);
      console.log('resonse.data.tid: ' + response.data.tid);
      console.log('localStoragetid: ' + localStorage.getItem('tid'));

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

export default Home;
