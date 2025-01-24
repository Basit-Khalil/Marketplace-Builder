import { useState } from 'react';
import ToastNotification from './toastNotification';
import Modal from './Modal';

const NotificationManager = () => {
  const [toastMessage, setToastMessage] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);

  const showToast = (message, type) => {
    setToastMessage({ message, type });
  };

  const showModal = (message) => {
    setModalMessage(message);
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  return (
    <div>
      {toastMessage && (
        <ToastNotification
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={closeToast}
        />
      )}

      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}

      {/* Example of using the notification functions */}
      <button onClick={() => showToast('Item added to your cart!', 'success')}>
        Show Toast (Success)
      </button>
      <button onClick={() => showToast('An error occurred!', 'error')}>
        Show Toast (Error)
      </button>
      <button onClick={() => showModal('Your purchase was successful!')}>
        Show Modal (Success)
      </button>
    </div>
  );
};

export default NotificationManager;
