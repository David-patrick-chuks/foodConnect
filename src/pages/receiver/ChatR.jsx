import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { Input } from "@material-tailwind/react";
import { IoArrowBack, IoMenu, IoSend } from "react-icons/io5";

const ChatR = () => {
  const { ChatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState("/images/Avatar.png");
  const [avatarUrlD, setAvatarUrlD] = useState("/images/Avatar.png");
  const [fullName, setFullName] = useState("");
  const [fullNameD, setFullNameD] = useState("");
  const [data, setData] = useState([]);

  // Fetch donor data
  useEffect(() => {
    const fetchReceiverData = async () => {
      const user = auth.currentUser;
      if (user) {
        const chatDoc = doc(db, "Chats", ChatId);
        const docSnap = await getDoc(chatDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setData(data.postImages);
          setFullNameD(data.donorName);
          setAvatarUrlD(data.donorAvatarURL || "/images/Avatar.png");
        } else {
          console.log("Donor data not found.");
        }
      }
    };

    fetchReceiverData();
  }, [ChatId]);

  // Fetch sender data
  useEffect(() => {
    const fetchSenderData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "FoodConnectUsers", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFullName(data.fullName);
          setAvatarUrl(data.avatarUrl || "/images/Avatar.png");
        } else {
          console.log("Sender data not found.");
        }
      }
    };

    fetchSenderData();
  }, []);

  // Fetch messages and mark unread messages as read
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "Chats", ChatId, "Messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const messagesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesArray);
      scrollToBottom();

      // Mark unread messages as read
      const unreadMessages = snapshot.docs.filter(
        (doc) => !doc.data().read && doc.data().senderId !== user.uid
      );

      for (let unreadMessage of unreadMessages) {
        const messageRef = doc(
          db,
          "Chats",
          ChatId,
          "Messages",
          unreadMessage.id
        );
        await updateDoc(messageRef, { read: true });
      }
    });

    return () => unsubscribe();
  }, [ChatId]);

  // Scroll to bottom function
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
      read: false, // Initially unread
    };

    // Add the new message
    await addDoc(collection(db, "Chats", ChatId, "Messages"), messageDoc);

    // Update the last message info in the chat
    const chatRef = doc(db, "Chats", ChatId);
    await updateDoc(chatRef, {
      customMessage: newMessage,
      lastMessageTime: messageDoc.timestamp,
    });

    setNewMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="flex h-[100%] flex-col">
      <div className="flex justify-between p-4 items-center shadow-sm py-2">
        <div className="flex gap-3 items-center">
          <Link to="/dashboard/receiver-messages">
            <IoArrowBack />
          </Link>
          <div>
            <img
              src={avatarUrlD}
              className="rounded-full h-8 object-cover w-8"
              alt="Receiver Avatar"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold capitalize">{fullNameD}</h2>
            <p className="text-xs -mt-1">Receiver</p>
          </div>
        </div>
        <IoMenu />
      </div>

      <div className="flex flex-col flex-1 h-full w-full overflow-scroll">
        <div>
          {data.length > 0 ? (
            <>
              {" "}
              <div className="grid rounded-lg border gap-1 border-white shadow-md bg-amber-50 w-1/2 grid-cols-3 grid-rows-2 ">
                <img
                  src={data[0]}
                  className="w-full h-full col-span-2 row-span-2 object-cover"
                />
                <img src={data[1]} className="w-full h-full object-cover" />{" "}
                <img src={data[2]} className="w-full h-full object-cover" />
              </div>
              <p>{fullName} accepted your claim</p>
            </>
          ) : null}
          {messages.map((message) => (
            <div key={message.id} className="message">
              <div>
                {message.senderId === auth.currentUser.uid ? (
                  <div className="w-full flex flex-col items-end p-2 justify-end">
                    <img
                      src={avatarUrl}
                      className="w-6 h-6 object-cover rounded-full"
                      alt="Sender Avatar"
                    />
                    <p className="bg-green-500 w-[70%] text-end">
                      {message.text}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {message.timestamp.toDate().toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-start p-2">
                    <img
                      src={avatarUrlD}
                      className="w-6 h-6 object-cover rounded-full"
                      alt="Receiver Avatar"
                    />
                    <p className="w-[70%] bg-red-600">{message.text}</p>
                    <p className="text-gray-400 w-[70%] text-sm">
                      {message.timestamp.toDate().toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
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
