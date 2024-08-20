import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { AiOutlineSearch, AiOutlineDelete } from "react-icons/ai";
import DonorProfileModal from "./DonorProfileModal";
import { db } from "../../utils/firebase";

const NotifyR = () => {
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const querySnapshot = await getDocs(collection(db, "ReceiverNotify"));
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setNotifications(data);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNotifications = notifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteNotification = async (id) => {
    await deleteDoc(doc(db, "ReceiverNotify", id));
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const openModal = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <AiOutlineSearch className="mr-2" />
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border rounded-lg shadow-md flex justify-between items-center cursor-pointer ${
              notification.status === "accepted" ? "bg-green-100" : "bg-red-100"
            }`}
            onClick={() => openModal(notification)}
          >
            <div>
              <p className="font-semibold">{notification.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(notification.timestamp.toDate()).toLocaleString()}
              </p>
            </div>
            <AiOutlineDelete
              className="text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNotification(notification.id);
              }}
            />
          </div>
        ))}
      </div>

      {isModalOpen && selectedNotification && (
        <DonorProfileModal
          notification={selectedNotification}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default NotifyR;
