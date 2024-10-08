import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection } from "firebase/firestore";
import { storage, db, auth } from "../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import {
  Input,
  Button,
  Typography,
  Select,
  Textarea,
  Spinner,
  Option as MaterialOption,
} from "@material-tailwind/react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import Preloader from "../../components/Preloader";
import { nigerianStates } from "../../utils/nigeriaStates";

const PostItem = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [stateValue, setStateValue] = useState("");
  const [recipients, setRecipients] = useState(1);

  const handleImageUpload = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleStateChange = (value) => {
    setStateValue(value);
    console.log(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (images.includes(null)) {
      toast.error("Please upload exactly 3 images");
      setLoading(false);
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not found");
      }

      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(storage, `donorItems/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);
          await uploadTask;
          return await getDownloadURL(uploadTask.snapshot.ref);
        })
      );

      const userDocRef = doc(db, "FoodConnectUsers", user.uid);

      const myPostsCollectionRef = collection(
        db,
        "FoodConnectUsers",
        user.uid,
        "MyPosts"
      );
      const postDocRef = doc(myPostsCollectionRef);
      await setDoc(postDocRef, {
        itemName, 
        description, 
        state: stateValue, 
        imageUrls, 
        recipients, 
        claims: 0, 
        claimedBy: [], 
        postedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }), 
        donorId: user.uid, 
        donorName: user.displayName || "Unknown Donor", 
        donorAvatar: user.photoURL || "/default-avatar.png", 
      });

      toast.success("Item posted successfully");

      setItemName("");
      setDescription("");
      setImages([null, null, null]);
      setLoading(false);
      setStateValue("");
      setRecipients(1);
    } catch (error) {
      console.error("Error posting item:", error);
      toast.error("Failed to post item. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && (
        <div className="z-50 flex fixed flex-col justify-center bg-black/50  items-center w-[80%] h-screen">
          <Spinner color="yellow" />
        </div>
      )}
      <div className="flex flex-col items-center w-full h-screen md:pb-0  md:p-5 ">
        <div className="w-full">
          <div className="w-full flex text-white bg-gradient-to-tl p-2 rounded shadow-md from-amber-400 to-amber-600">
            <p className="md:text-xl">
              <FaRegEdit />
            </p>
            <div className="md:p-2 p-1">
              {" "}
              <p className="m-0 font-bold text-lg md:text-xl mb-1">
                Post Free Food Item for Donation
              </p>
              <p className=" text-xs hidden md:block leading-4 font-normal">
                Contribute to your community by posting food items that others
                can claim. Wheither its fresh produce, grains, or packaged
                goods, your donation can make a difference. Please provide the
                details of the food item and upload images to help receivers
                make informed choices.
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:px-5 py-3 gap-4"
          >
            <div>
              <Typography variant="h6" className="mb-1text-black pop ">
                Food Name
              </Typography>

              <Input
                placeholder="6 Tubers of yam"
                className=" !border-[#000000] focus:!border-2 text-dark"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                autoComplete="off"
                type="text"
                size="lg"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
            <div>
              <Typography variant="h6" className="mb-1 text-black pop ">
                Description
              </Typography>
              <Textarea
                placeholder="Provide a brief description of the food item (e.g., quantity, etc.)"
                className=" !border-[#000000] focus:!border-2 text-dark text-xs"
                labelProps={{
                  className: "before:content-none after:content-none ",
                }}
                autoComplete="off"
                type="text"
                size="lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col gap-2 w-full md:w-[35%]">
                <label className="font-medium text-sm" htmlFor="state">
                  Select the state where the food is located
                </label>

                <Select
                  value={stateValue}
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}
                  selected={(element) =>
                    element &&
                    React.cloneElement(element, {
                      disabled: true,
                      className:
                        "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                    })
                  }
                  onChange={handleStateChange}
                >
                  {nigerianStates.map((state) => (
                    <MaterialOption
                      key={state.name}
                      value={state.name}
                      className="flex items-center gap-2"
                    >
                      {state.name}
                    </MaterialOption>
                  ))}
                </Select>
              </div>
              <div>
                <Typography variant="h6" className="mb-1 text-black pop ">
                  Number of Recipients
                </Typography>
                <Input
                  placeholder="Enter number of recipients"
                  className="!border-[#000000] focus:!border-2 text-dark"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  autoComplete="off"
                  type="number"
                  size="lg"
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-5 md:mt-0 md:flex-row items-center w-full md:w-[60%]">
                <div className="md:mb-1 mb-4 text-black font-medium pop w-full ">
                  <h1 className="font-semibold text-lg">
                    Upload Images{" "}
                    <div className="bg-amber-100 rounded-full h-4 text-xs w-4 font-normal inline-grid place-items-center ">
                      !
                    </div>
                  </h1>
                  <div>
                    <div>
                      <p className="text-xs font-normal">
                        Upload 3 images of the food item.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  {images.map((image, index) => (
                    <label
                      key={index}
                      className="flex justify-center items-center md:w-24 w-24 md:h-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
                    >
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <FaPlus className="h-8 w-8 text-gray-400" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index)}
                        className="hidden"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="mt-4 bg-black hover:shadow-md text-base font-medium shadow-md  pop capitalize"
              fullWidth
              disabled={loading}
              loading={loading}
            >
              Post Food Item
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostItem;
