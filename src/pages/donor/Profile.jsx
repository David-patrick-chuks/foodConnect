import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { Options } from "react-naija-states";
import { FaCamera } from "react-icons/fa";
import Preloader from "../../components/Preloader";

export default function Profile() {
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
  const [companyName, setCompanyName] = useState("");

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
          setCompanyName(data.companyName || "");
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
   try {
     const user = auth.currentUser;
     const file = event.target.files[0];
     const avatarRef = ref(storage, `avatars/${user.uid}`);
     await uploadBytes(avatarRef, file);
     const downloadURL = await getDownloadURL(avatarRef);
     await updateDoc(doc(db, "FoodConnectUsers", user.uid), {
       avatarUrl: downloadURL,
     });
     setAvatarUrl(downloadURL);
     console.log("profile successfully updated");
     toast.success("Avatar updated successfully");
   } catch (error) {
    console.log(error.message);
   }
  };

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    await updateDoc(doc(db, "FoodConnectUsers", user.uid), {
      bio,
      phoneNumber,
      state,
      companyName,
    });
    toast.success("Profile updated successfully");
  };

  // if (loading) {
  //   return <Preloader />;
  // }

  return (
    <div className="py-6 px-2 md:px-5 ">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="mb-4 flex items-center justify-between w-full h-fit z-10">
        <div className="relative w-24 mb-2 z-20">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-full h-full rounded-full object-cover"
          />
          <label
            htmlFor="avatarUpload"
            className="absolute bottom-0 right-0 bg-yellow-100 text-black p-1 md:p-2 rounded-full cursor-pointer"
          >
            <FaCamera className="w-5 h-5" />
          </label>
          <input
            id="avatarUpload"
            type="file"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <div className="w-full flex justify-end z-20">
          {" "}
          <Button className="bg-amber-600 pop " onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </div>
      </div>
      <div className="mb-1 w-full">
        <label htmlFor="Bio" className=" text-amber-600 font-bold text-xs">
          Bio
        </label>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mb-1"
        />
      </div>
      <div className="flex gap-3 w-full justify-between">
        <div className="mb-4 w-full">
          <label
            htmlFor="First Name"
            className=" text-amber-600 font-bold text-xs"
          >
            First Name
          </label>
          <Input
            label="First Name"
            value={firstName}
            disabled
            className="mb-2 "
          />
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="Last Name"
            className=" text-amber-600 font-bold text-xs"
          >
            Last Name
          </label>
          <Input label="Last Name" value={lastName} disabled className="mb-2" />
        </div>
      </div>
      <div className="flex w-full gap-3">
        <div className="mb-4 w-full">
          <label
            htmlFor="PhoneNumber"
            className=" text-amber-600 font-bold text-xs"
          >
            Phone Number
          </label>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mb-2"
          />
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="CompanyName"
            className=" text-amber-600 font-bold text-xs"
          >
            Company Name
          </label>
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mb-2"
          />
        </div>{" "}
      </div>
      <div className="flex w-full gap-3">
        <div className="mb-4 w-full">
          <label htmlFor="state" className=" text-amber-600 font-bold text-xs">
            State
          </label>
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
        <div className="mb-4 w-full">
          <label
            htmlFor="Country"
            className=" text-amber-600 font-bold text-xs"
          >
            Country
          </label>
          <Input label="Country" value="Nigeria" disabled className="mb-2" />
        </div>{" "}
      </div>

      <div className="flex w-full gap-3">
        <div className="mb-4 w-full">
          <label htmlFor="Email" className=" text-amber-600 font-bold text-xs">
            Email
          </label>
          <Input label="Email" value={email} disabled className="mb-2" />
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="User Type"
            className=" text-amber-600 font-bold text-xs"
          >
            User Type
          </label>
          <Input label="User Type" value={userType} disabled className="mb-2" />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="Joined FoodConnect on"
          className=" text-amber-600 font-bold text-xs"
        >
          Joined FoodConnect on: <span className="text-black">{createdAt}</span>
        </label>
        {/* <Input
          label="Joined FoodConnect on"
          value={createdAt}
          disabled
          className="mb-2"
        /> */}
        <div className="mb-1 w-full">
          <label htmlFor="Bio" className=" text-amber-600 font-bold text-xs">
            Bio
          </label>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mb-1"
          />
        </div>
      </div>
    </div>
  );
}
