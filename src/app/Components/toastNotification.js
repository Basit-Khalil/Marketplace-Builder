import { useEffect } from 'react';

const ToastNotification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Automatically close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  // Determine the background color based on the 'type' prop (success, error, etc.)
  const toastTypeClass = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-gray-500';

  return (
    <div
      className={`${toastTypeClass} text-white p-3 rounded-lg shadow-lg fixed bottom-5 right-5 w-80 max-w-xs opacity-0 animate-fadeIn`}
    >
      {message}
    </div>
  );
};

export default ToastNotification;

