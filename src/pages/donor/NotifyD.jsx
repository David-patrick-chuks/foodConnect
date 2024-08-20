import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { FaTrashAlt } from "react-icons/fa"; // Import the trash icon
import NotificationModal from "./NotificationModal"; // Import the modal component

const NotifyD = () => {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiverProfile, setReceiverProfile] = useState(null); // State to store receiver's profile

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not authenticated.");

        // Get current user's donor ID
        const userDocRef = doc(db, "FoodConnectUsers", user.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        if (!userData) throw new Error("User data not found.");

        const donorId = userData.userId; // Assuming donorId is stored here

        // Fetch notifications for the current user
        const notificationsQuery = query(
          collection(db, "Notifications"),
          where("donorId", "==", donorId)
        );
        const notificationsSnapshot = await getDocs(notificationsQuery);

        const notificationsList = notificationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort notifications by timestamp
        notificationsList.sort(
          (a, b) => b.timestamp.seconds - a.timestamp.seconds
        );

        setNotifications(notificationsList);
        setFilteredNotifications(notificationsList);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to fetch notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notificationId) => {
    try {
      const notification = notifications.find(
        (notif) => notif.id === notificationId
      );
      if (notification) {
        // Fetch the receiver's profile using the claimedBy ID
        const receiverDocRef = doc(
          db,
          "FoodConnectUsers",
          notification.claimedBy
        );
        const receiverDoc = await getDoc(receiverDocRef);

        if (receiverDoc.exists()) {
          setReceiverProfile(receiverDoc.data());
        } else {
          console.error("Receiver profile not found.");
        }

        setSelectedNotification(notification);
        setIsModalOpen(true);

        const notificationDocRef = doc(db, "Notifications", notificationId);
        await updateDoc(notificationDocRef, { viewed: true });

        // Optionally, update the local state to reflect the change immediately
        setFilteredNotifications((prevNotifications) =>
          prevNotifications.map((notif) =>
            notif.id === notificationId ? { ...notif, viewed: true } : notif
          )
        );
      }
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const notificationDocRef = doc(db, "Notifications", notificationId);
      await deleteDoc(notificationDocRef);

      // Remove notification from local state
      setFilteredNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif.id !== notificationId)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
      setError("Failed to delete notification.");
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter notifications based on the search query
    const filtered = notifications.filter((notification) =>
      notification.message.toLowerCase().includes(query)
    );
    setFilteredNotifications(filtered);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
    setReceiverProfile(null); // Clear receiver profile data
  };

  const updateNotificationStatus = async (notificationId, status) => {
    try {
      const notificationDocRef = doc(db, "Notifications", notificationId);
      await updateDoc(notificationDocRef, { status });

      // Update local state
      setFilteredNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notificationId ? { ...notif, status } : notif
        )
      );
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  const createReceiverNotification = async (
    receiverId,
    donorName,
    status,
    donorId
  ) => {
    try {
      const message = `${donorName} ${
        status === "accepted" ? "accepted" : "rejected"
      } your claim.`;

      await addDoc(collection(db, "ReceiverNotify"), {
        receiverId,
        donorId, // Add the donorId here
        message,
        status,
        viewed: false,
        timestamp: new Date(),
        donorName,
      });
    } catch (error) {
      console.error("Error creating receiver notification:", error);
    }
  };

  // Other imports

  const handleAccept = async (notification) => {
    const user = auth.currentUser;
    if (user && receiverProfile) {
      await updateNotificationStatus(notification.id, "accepted");
      await createReceiverNotification(
        notification.claimedBy,
        receiverProfile.fullName,
        "accepted",
        notification.donorId
      );
      await createChat(
        notification.claimedBy,
        notification.receiverAvatarURL,
        notification.donorAvatarURL,
        notification.donorId,
        notification.donorFullName,
        notification.receiverFullName
      );
      handleModalClose();
    }
  };

  const createChat = async (
    receiverId,
    receiverAvatarURL,
    donorAvatarURL,
    donorId,
    donorFullName,
    receiverFullName
  ) => {
    try {
      await addDoc(collection(db, "Chats"), {
        receiverId,
        receiverAvatarURL,
        donorAvatarURL,
        donorId,
        donorName: donorFullName,
        receiverName: receiverFullName,
        customMessage: `${donorFullName} accepted your claim, you can now chat to receive your food item.`,
        lastMessageTime: new Date(),
        otherNecessaryData: "Any other data you want to store",
      });
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleReject = async (notification) => {
    const user = auth.currentUser;
    if (user && receiverProfile) {
      await updateNotificationStatus(notification.id, "rejected");
      await createReceiverNotification(
        notification.claimedBy,
        receiverProfile.fullName,
        "rejected",
        notification.donorId
      );
      handleModalClose();
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-amber-600 mb-4">Notifications</h2>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search notifications..."
          className="p-2 border rounded w-full"
        />
      </div>
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {filteredNotifications.length > 0 ? (
        <ul className="space-y-4">
          {filteredNotifications.map((notification) => (
            <li
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              className={`p-4 rounded shadow-md cursor-pointer ${
                notification.viewed ? "bg-green-100" : "bg-red-100"
              } flex justify-between items-center`}
            >
              <div>
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(
                    notification.timestamp.seconds * 1000
                  ).toLocaleString()}
                </p>
                {notification.status && (
                  <p
                    className={`text-sm font-bold mt-2 ${
                      notification.status === "accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    You {notification.status} this claim.
                  </p>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents click event on the notification
                  handleDeleteNotification(notification.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className="text-gray-600">No notifications found.</p>
      )}

      {/* Modal Component */}
      {selectedNotification && (
        <NotificationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          receiverProfile={receiverProfile}
          onAccept={() => handleAccept(selectedNotification)}
          onReject={() => handleReject(selectedNotification)}
          status={selectedNotification.status} // Pass status to modal
        />
      )}
    </div>
  );
};

export default NotifyD;
