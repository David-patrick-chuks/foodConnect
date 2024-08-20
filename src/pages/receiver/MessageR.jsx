import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { Link } from "react-router-dom";

const MessageR = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "Chats"),
      where("receiverId", "==", user.uid)
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
              src={chat.donorAvatarURL}
              alt="Donor Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <Link to={`/dashboard/receiver-messages/${chat.id}`}>
                <p className="font-bold">Chat with {chat.donorName}</p>
                <p className="text-gray-500">{chat.customMessage}</p>
                <p className="text-gray-400 text-sm">
                  {chat.lastMessageTime?.toDate().toLocaleString()}
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

export default MessageR;
