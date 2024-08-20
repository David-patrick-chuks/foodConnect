import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, onClose, }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
        className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 text-2xl right-2 text-black hover:text-gray-700"
        >
          <IoClose />
        </button>
        <div className="mb-4">{children}</div>
    
      </div>
    </div>
  );
};

export default Modal;
