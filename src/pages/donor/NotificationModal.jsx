import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const NotificationModal = ({
  isOpen,
  onClose,
  receiverProfile,
  onAccept,
  onReject,
  status,
}) => {
  if (!isOpen || !receiverProfile) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-6 w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4 text-amber-600">
          Receiver Profile
        </h2>
        <img
          src={receiverProfile.avatarUrl || "/images/D3.jpeg"}
          className="w-10 h-10 rounded-full "
        />
        <p className="mb-2">
          <strong>Full Name:</strong> {receiverProfile.fullName}
        </p>
        <p className="mb-4">
          <strong>Bio:</strong> {receiverProfile.bio}
        </p>
        <div className="flex justify-between">
          {status ? (
            <p
              className={`text-lg font-bold ${
                status === "accepted" ? "text-green-500" : "text-red-500"
              }`}
            >
              You {status} this claim.
            </p>
          ) : (
            <>
              <button
                onClick={onAccept}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
              >
                <FaCheck className="mr-2" /> Accept
              </button>
              <button
                onClick={onReject}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center"
              >
                <FaTimes className="mr-2" /> Reject
              </button>
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
