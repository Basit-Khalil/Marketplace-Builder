import { useState } from 'react';

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
        <span
          className="absolute top-2 right-2 text-xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <p className="text-center">{message}</p>
      </div>
    </div>
  );
};

export default Modal;

