import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, Input } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { Options } from "react-naija-states";
import { FaCamera } from "react-icons/fa";
import Preloader from "../../components/Preloader";

export default function ProfileR() {
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("/images/Avatar.png");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "FoodConnectUsers", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAvatarUrl(data.avatarUrl || "/images/Avatar.png");
          setBio(data.bio || "");
          setPhoneNumber(data.phoneNumber || "");
          setState(data.state || "");
          setFirstName(data.fullName.split(" ")[0]);
          setLastName(data.fullName.split(" ")[1]);
          setEmail(data.email);
          setUserType(data.userType);
          setCreatedAt(data.createdAt);
        }
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleAvatarChange = async (event) => {
    const user = auth.currentUser;
    const file = event.target.files[0];
    const avatarRef = ref(storage, `avatars/${user.uid}`);
    await uploadBytes(avatarRef, file);
    const downloadURL = await getDownloadURL(avatarRef);
    await updateDoc(doc(db, "FoodConnectUsers", user.uid), {
      avatarUrl: downloadURL,
    });
    setAvatarUrl(downloadURL);
    toast.success("Avatar updated successfully");
  };

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    await updateDoc(doc(db, "FoodConnectUsers", user.uid), {
      bio,
      phoneNumber,
      state,
    });
    toast.success("Profile updated successfully");
  };

  // if (loading) {
  //   return <Preloader />
  // }

  return (
    <div className="p-6 relative">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="w-full flex justify-end">
        {" "}
        <Button className="bg-amber-600 pop " onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </div>
      <div className="mb-4">
        <div className="relative w-24 h-24 mb-2">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-full h-full rounded-full object-cover"
          />
          <label
            htmlFor="avatarUpload"
            className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full cursor-pointer"
          >
            <FaCamera className="w-6 h-6" />
          </label>
          <input
            id="avatarUpload"
            type="file"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
      </div>
      <div className="mb-4">
        <Input
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mb-2"
        />
      </div>
      <div className="mb-4">
        <Input
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mb-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="state">State</label>
        <select
          name="state"
          placeholder="Please select a State"
          value={state || ""}
          onChange={(e) => setState(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <Options type="state" />
        </select>
      </div>
      <div className="mb-4">
        <Input label="Country" value="Nigeria" disabled className="mb-2" />
      </div>
      <div className="mb-4">
        <Input label="First Name" value={firstName} disabled className="mb-2" />
      </div>
      <div className="mb-4">
        <Input label="Last Name" value={lastName} disabled className="mb-2" />
      </div>
      <div className="mb-4">
        <Input label="Email" value={email} disabled className="mb-2" />
      </div>
      <div className="mb-4">
        <Input label="User Type" value={userType} disabled className="mb-2" />
      </div>
      <div className="mb-4">
        <Input
          label="Joined FoodConnect on"
          value={createdAt}
          disabled
          className="mb-2"
        />
      </div>
    </div>
  );
}
