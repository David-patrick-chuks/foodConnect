import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { Link } from "react-router-dom";

const MessageD = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Query to fetch chats where the donorId matches the current user, and order them by lastMessageTime (descending)
    const q = query(
      collection(db, "Chats"),
      where("donorId", "==", user.uid),
      orderBy("lastMessageTime", "desc") // Orders by lastMessageTime, latest first
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Chat List</h2>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat.id}
            className="mb-4 border p-4 rounded-lg flex items-center"
          >
            <img
              src={chat.receiverAvatarURL}
              alt="Receiver Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <Link to={`/dashboard/donor-messages/${chat.id}`}>
                <p className="font-bold">Chat with {chat.receiverName}</p>
                <p className="text-gray-500">{chat.customMessage}</p>
                <p className="text-gray-400 text-sm">
                  {chat.lastMessageTime.toDate().toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No chats available</p>
      )}
    </div>
  );
};

export default MessageD;
