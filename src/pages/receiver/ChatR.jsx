import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { Input } from "@material-tailwind/react";
import { IoSend } from "react-icons/io5";

const ChatR = () => {
  const { ChatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "Chats", ChatId, "Messages"),
      orderBy("timestamp", "asc")
    );
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesArray);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [ChatId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    setNewMessage("");

    const user = auth.currentUser;
    if (!user) return;

    const messageDoc = {
      text: newMessage,
      senderId: user.uid,
      timestamp: new Date(),
    };

    await addDoc(collection(db, "Chats", ChatId, "Messages"), messageDoc);

    // Update last message in chat document
    const chatRef = doc(db, "Chats", ChatId);
    await updateDoc(chatRef, {
      customMessage: newMessage,
      lastMessageTime: messageDoc.timestamp,
    });

    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex h-[100%] flex-col">
      <h2 className="flex">Chat</h2>
      <div className="flex flex-col flex-1 h-full w-full overflow-auto">
        <div>
          {messages.map((message) => (
            <div key={message.id} className="message">
              <div>
                {message.senderId === auth.currentUser.uid ? (
                  <div className="w-full flex flex-col items-end p-2 justify-end">
                    <p className="bg-green-500 w-[70%] text-end">
                      {message.text}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {message.timestamp?.toDate().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-start p-2">
                    <p className="w-[70%] bg-red-600">{message.text}</p>
                    <p className="text-gray-400 w-[70%] text-sm">
                      {message.timestamp?.toDate().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="flex bg-white">
        <Input
          onKeyDown={handleKeyDown}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>
          <IoSend size={30} />
        </button>
      </div>
    </div>
  );
};

export default ChatR;
