import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoChatbox, IoMenu } from "react-icons/io5";
import { auth, db } from "../../utils/firebase";
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Typography } from "@material-tailwind/react";

export default function Header({ handleSidebarNav }) {
  const [firstName, setFirstName] = useState("" || "FoodConnect");
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/images/Avatar.png");
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = doc(db, "FoodConnectUsers", user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const name = data.fullName.split(" ")[0];
            setFirstName(name);
            setUserType(data.userType);
            setAvatarUrl(data.avatarUrl || "/images/Avatar.png");
            setLoading(false);

            // Fetch notifications
            const notificationsQuery = query(
              collection(db, "Notifications"),
              where("userId", "==", data.userId), // Filter notifications by userId
              where("viewed", "==", false) // Get only unviewed notifications
            );
            const notificationsSnapshot = await getDocs(notificationsQuery);
            const fetchedNotifications = notificationsSnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );
            setNotifications(fetchedNotifications);
            setNotificationCount(fetchedNotifications.length);
          }
        } catch (error) {
          console.log(
            "Error while getting user data in header:",
            error.message
          );
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleViewNotification = async (notificationId) => {
    try {
      // Update notification status to viewed in Firestore
      const notificationDoc = doc(db, "Notifications", notificationId);
      await updateDoc(notificationDoc, { viewed: true });

      // Update state
      const updatedNotifications = notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, viewed: true } : notif
      );
      setNotifications(updatedNotifications);

      // Update notification count
      setNotificationCount(notificationCount - 1);
    } catch (error) {
      console.error("Error viewing notification:", error);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      // Delete the notification from Firestore
      await deleteDoc(doc(db, "Notifications", notificationId));

      // Update state
      const updatedNotifications = notifications.filter(
        (notif) => notif.id !== notificationId
      );
      setNotifications(updatedNotifications);

      // Update notification count
      if (
        updatedNotifications.find(
          (notif) => notif.id === notificationId && !notif.viewed
        )
      ) {
        setNotificationCount(notificationCount - 1);
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) {
      return "Good Morning,";
    } else if (hours < 18) {
      return "Good Afternoon,";
    } else {
      return "Good Evening,";
    }
  };

  return (
    <>
    {loading ? (
        <div className="flex p-3 shadow-md w-full top-2 animate-pulse flex-row-reverse justify-between items-center gap-8">
          <div className="flex items-center flex-row-reverse gap-3">
            <div className="grid p-3 place-items-center rounded-full bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.158 3.142 3.142L20.25 6"
                />
              </svg>
            </div>
            <div className="grid p-3 place-items-center rounded-full bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4h16v16H4V4z"
                />
              </svg>
            </div>
          </div>
          <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-full bg-gray-200">
              <FaBell className="text-gray-400" />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 shadow-md w-full top-2 flex flex-row-reverse justify-between items-center gap-8">
          <div className="flex items-center flex-row-reverse gap-3">
            <button
              className="flex items-center justify-center w-10 h-10 p-2 rounded-full bg-amber-600 text-white"
              onClick={handleSidebarNav}
            >
              <IoMenu className="text-2xl" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 p-2 rounded-full bg-gray-200 text-gray-500">
              <IoChatbox className="text-2xl" />
            </button>
            <div className="relative flex items-center justify-center w-10 h-10 p-2 rounded-full bg-gray-200">
              <FaBell className="text-gray-500" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-600 rounded-full">
                  {notificationCount}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <Typography variant="h6" color="blue-gray">
                {getGreeting()} {firstName}
              </Typography>
              <Typography variant="small" color="gray">
                UserType: {userType}
              </Typography>
            </div>
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
