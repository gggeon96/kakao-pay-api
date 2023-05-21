import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

import WarningModal from '../components/WarningModal';

const ReservationStatus = () => {
  const data = {
    cherryBox: {
      quantity: 10,
      priceAfterDiscount: 10000,
    },
  };
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [orderPrice, setOrderPrice] = useState(0);
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    if (orderQuantity <= 0) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '수량을 선택해주세요',
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    if (localStorage.paymentCompleted === 'true') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '결제가 완료되었습니다',
        showConfirmButton: false,
        timer: 1000,
      });
      localStorage.removeItem('paymentCompleted');
    }
  }, []);

  return (
    <div className='flex flex-col justify-center text-center my-6 pb-6 border-b border-b-line '>
      <p className='mx-10 py-2 rounded-3xl bg-itembg'>{data && data.cherryBox.quantity}개 남았습니다!</p>

      <div className='mb-6 flex flex-row justify-center items-center z-10'>
        <button
          className='w-6 h-6 font-bold rounded-full bg-primary active:bg-primaryevent'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            if (orderQuantity) {
              setOrderQuantity(orderQuantity - 1);
              setOrderPrice((orderQuantity - 1) * data.cherryBox.priceAfterDiscount);
            } else {
              setOrderQuantity(0);
              setOrderPrice(0);
            }
          }}
        >
          -
        </button>
        <p className='font-bold text-3xl mx-3'>{orderQuantity}</p>
        <button
          className='w-6 h-6 font-bold rounded-full bg-primary active:bg-primaryevent'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            if (orderQuantity < data.cherryBox.quantity) {
              setOrderQuantity(orderQuantity + 1);
              setOrderPrice((orderQuantity + 1) * data.cherryBox.priceAfterDiscount);
            }
          }}
        >
          +
        </button>
      </div>
      <div className='flex justify-center rounded-xl mx-auto px-8 p-2 bg-itembg'>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            toggleModal();
          }}
        >
          <span className='tracking-tighter'>
            예약하기 <br /> {orderPrice} 원
          </span>
        </button>
      </div>
      <WarningModal open={open} setOpen={setOpen} orderQuantity={orderQuantity} />
    </div>
  );
};

export default ReservationStatus;
