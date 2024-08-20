import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { Input } from "@material-tailwind/react";
import { IoArrowBack, IoMenu, IoSend } from "react-icons/io5";

const ChatD = () => {
  const { ChatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState("/images/Avatar.png");
  const [avatarUrlR, setAvatarUrlR] = useState("/images/Avatar.png");
  const [fullName, setFullName] = useState("");
  const [fullNameR, setFullNameR] = useState("");
  // const [senderId, setSenderId] = useState("");

  useEffect(() => {
    const fetchUserDataa = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "Chats", ChatId);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data);
          setFullNameR(data.receiverName);
          setAvatarUrlR(data.receiverAvatarURL);
        } else {
          console.log("not esist");
        }
      }
    };

    fetchUserDataa();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "FoodConnectUsers", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFullName(data.fullName);
          setAvatarUrl(data.avatarUrl);
        } else {
          console.log("not esist");
        }
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    const q = query(
      collection(db, "Chats", ChatId, "Messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesArray);
    });

    return () => unsubscribe();
  }, [ChatId]);
  // Ensure scroll to bottom after messages array is updated
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    setNewMessage(""); // Clear the input field after sending the message
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
      <div className="flex justify-between p-4 items-center shadow-sm py-2">
        <div className="flex gap-3 items-center">
          <Link to="/dashboard/donor-messages">
            <IoArrowBack />{" "}
          </Link>
          <div>
            <img src={avatarUrlR} className=" rounded-full w-8" />
          </div>
          <div className="flex flex-col ">
            <h2 className="flex font-bold capitalize">{fullNameR}</h2>
            <p className="text-xs -mt-1 ">Receiver</p>
          </div>
        </div>
        <div>
          <IoMenu />
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full w-full overflow-auto">
        <div>
          {messages.map((message) => (
            <div key={message.id} className="message">
              <div>
                {message.senderId === auth.currentUser.uid ? (
                  <div className="w-full flex flex-col items-end p-2 justify-end">
                    <img src={avatarUrl} className="w-6 rounded-full" />
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
                    <img src={avatarUrlR} className="w-6 rounded-full" />
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

export default ChatD;
