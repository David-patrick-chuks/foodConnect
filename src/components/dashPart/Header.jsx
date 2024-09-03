import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoCart, IoChatbox, IoMenu } from "react-icons/io5";
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
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Header({ handleSidebarNav }) {
  const [firstName, setFirstName] = useState("" || "FoodConnect");
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("" || "Receiver");
  const [avatarUrl, setAvatarUrl] = useState("/images/Avatar.png");
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(7);
  const [claimCount, setCLaimCount] = useState(4);
const [unreadMessagesCount, setUnreadMessagesCount] = useState(6);


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDoc = doc(db, "FoodConnectUsers", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const userId = data.userId;
          const name = data.fullName.split(" ")[0];
          setFirstName(name);
          setUserType(data.userType);
          setAvatarUrl(data.avatarUrl || "/images/Avatar.png");

          // Real-time listener for claims
          const claimsCollectionRef = collection(
            db,
            "FoodConnectUsers",
            userId,
            "MyClaims"
          );
          const claimQuery = query(
            claimsCollectionRef,
            where("viewed", "==", false),
            where("status", "==", "pending")
          );
          const claimsUnsubscribe = onSnapshot(claimQuery, (snapshot) => {
            const fetchedClaims = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setCLaimCount(fetchedClaims.length || "");
            console.log(fetchedClaims);
          });

          // Real-time listener for notifications
          const notificationsQuery = query(
            collection(db, "ReceiverNotify"),
            where("receiverId", "==", userId),
            where("viewed", "==", false)
          );
          const notificationsUnsubscribe = onSnapshot(
            notificationsQuery,
            (snapshot) => {
              const fetchedNotifications = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setNotifications(fetchedNotifications);
              setNotificationCount(fetchedNotifications.length);
              console.log(fetchedNotifications.length);
            }
          );

          // Real-time listener for unread messages
          const chatsQuery = query(
            collection(db, "Chats"),
            where("receiverId", "==", userId) // Track messages where the user is the receiver
          );
          const chatsUnsubscribe = onSnapshot(chatsQuery, (chatSnapshot) => {
            let totalUnreadMessages = 0; // Track total unread messages

            chatSnapshot.forEach((chatDoc) => {
              const chatId = chatDoc.id;

              // Listen to unread messages in the chat
              const messagesQuery = query(
                collection(db, "Chats", chatId, "Messages"),
                where("read", "==", false),
                where("senderId", "!=", userId) // Only count messages sent by others
              );

              onSnapshot(messagesQuery, (messageSnapshot) => {
                totalUnreadMessages += messageSnapshot.size; // Add the count of unread messages
                setUnreadMessagesCount(totalUnreadMessages); // Update the state with the count
              });
            });
          });

          // Cleanup function to unsubscribe from all snapshots
          return () => {
            claimsUnsubscribe();
            notificationsUnsubscribe();
            chatsUnsubscribe();
          };
        }
      } catch (error) {
        console.log("Error while getting user data in header:", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);



  
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
        <div className="p-3 shadow-md w-full top-2 flex flex-row dark:bg-amber-600 bg-gray-50 justify-between items-center gap-8">
          <p className="text-2xl font-semibold text-black">{getGreeting()}</p>

          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
          {/* <div className="flex items-center flex-row-reverse gap-3">
            <button
              className="flex items-center justify-center w-10 h-10 p-2 rounded-full bg-yellow-600 text-white"
              onClick={handleSidebarNav}
            >
              <IoMenu className="text-2xl" />
            </button>
            <button className="relative flex items-center justify-center w-10 h-10 p-2 rounded-full bg-gray-200">
              <IoChatbox className="text-2xl" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-600 rounded-full">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <div className="relative flex items-center justify-center w-10 h-10 p-2 rounded-full bg-gray-200">
              <IoCart className="text-gray-500" />
              {claimCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-600 rounded-full">
                  {claimCount}
                </span>
              )}
            </div>
            <div className="relative flex items-center justify-center w-10 h-10 p-2 rounded-full bg-gray-200">
              <FaBell className="text-gray-500" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-600 rounded-full">
                  {notificationCount}
                </span>
              )}
            </div>
          </div> */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <Typography variant="h6" className="pop" color="black">
                {firstName}
              </Typography>
              <Typography
                variant="small"
                className="pop leading-none"
                color="black"
              >
                {userType}
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
