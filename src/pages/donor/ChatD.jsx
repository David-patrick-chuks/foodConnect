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
import Preloader from "../../components/Preloader";

const ChatD = () => {
  const { ChatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState("/images/Avatar.png");
  const [avatarUrlR, setAvatarUrlR] = useState("/images/Avatar.png");
  const [fullName, setFullName] = useState("");
  const [fullNameR, setFullNameR] = useState("");
  const [data, setData] = useState([]);
  // const [senderId, setSenderId] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchUserDataa = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "Chats", ChatId);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data || {});
          setData(data.postImages);
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
          console.log(data);
          setAvatarUrl(data.avatarUrl || "/images/Avatar.png");
        } else {
          console.log("not esist");
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setloading(true);
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
      setloading(false);
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
      read: false, // Track unread messages
    };

    // Save message in sub-collection
    await addDoc(collection(db, "Chats", ChatId, "Messages"), messageDoc);

    // Update last message in chat document
    const chatRef = doc(db, "Chats", ChatId);
    await updateDoc(chatRef, {
      customMessage: newMessage,
      lastMessageTime: messageDoc.timestamp,
    });

    setNewMessage(""); // Clear the input field after sending the message
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
  if (loading) {
    return <Preloader />;
  }
  return (
    <div className="flex h-[100%] flex-col">
      <div className="flex justify-between p-4 items-center shadow-sm py-2">
        <div className="flex gap-3 items-center">
          <Link to="/dashboard/donor-messages">
            <IoArrowBack />{" "}
          </Link>
          <div>
            <img
              src={avatarUrlR}
              className=" h-8 object-cover rounded-full w-8"
            />
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
      <div className="flex flex-col flex-1 h-full w-full overflow-scroll">
        <div>
          <div className="flex flex-col items-end ">
            {data.length > 0 ? (
              <>
                {" "}
                <div className="grid  mr-2 rounded-lg border gap-1 border-white shadow-md overflow-hidden bg-yellow-600  w-1/2 grid-cols-3 grid-rows-2 ">
                  <img
                    src={data[0]}
                    className="w-full h-full col-span-2 row-span-2 object-cover"
                  />
                  <img src={data[1]} className="w-full h-full object-cover" />{" "}
                  <img src={data[2]} className="w-full h-full object-cover" />
                </div>
                <p className="bg-amber-50 mr-2 text-start flex py-2 px-2 rounded-tl-xl rounded-tr-md  rounded-bl-xl max-w-[60%]">
                  you accepted this claim
                </p>
              </>
            ) : null}
          </div>
          {messages.map((message) => (
            <div key={message.id} className="message">
              <div>
                {message.senderId === auth.currentUser.uid ? (
                  <div className="cursor-pointer w-full flex flex-col items-end p-2 justify-end">
                    <div className=" min-w-[60%] items-end flex flex-col">
                      <p className="bg-yellow-600 mr-2 text-start flex py-2 px-2 rounded-tl-xl rounded-tr-md  rounded-bl-xl max-w-[60%]">
                        {message.text}
                      </p>
                      <img
                        src={avatarUrl}
                        className="w-4 rounded-full -mt-2 h-4 object-cover"
                      />
                    </div>
                    <span className="text-gray-400 text-xs inline-block ">
                      {message.timestamp.toDate().toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ) : (
                  <div className=" cursor-pointer w-full flex flex-col items-start p-2 justify-end">
                    <div className=" min-w-[60%] items-start flex flex-col">
                      <p className="bg-yellow-600 mr-2 text-start flex py-2 px-2 rounded-rl-xl rounded-tr-md  rounded-br-xl max-w-[60%]">
                        {message.text}
                      </p>
                      <img
                        src={avatarUrlR}
                        className="w-4 rounded-full -mt-2 h-4 object-cover"
                      />
                    </div>
                    <span className="text-gray-400 text-xs inline-block ">
                      {message.timestamp.toDate().toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
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
