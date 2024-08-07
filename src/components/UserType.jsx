import { Button, Card, Typography } from "@material-tailwind/react";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FaDonate, FaHandHoldingHeart, FaShoppingBasket } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
export default function UserType() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("donor");
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        try {
          const userDoc = await getDoc(doc(db, "FoodConnectUsers", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFullName(userData.fullName || "");
          }
        } catch (error) {
          console.log(error.message, "error while fetching fc user data");
        }
      } else {
        setUserId(null);
        setFullName("");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, db]);

  const handleBackHome = () => {
    navigate("/");
  };
  const handleUserTypeSubmit = async (e) => {
    e.preventDefault();
    if (userType && userId) {
      try {
        const userDocRef = doc(db, "FoodConnectUsers", userId);
        await updateDoc(userDocRef, { fcUserType: userType });
        console.log("user type updated to the db 'FcUser'");
        navigate("/profile");
      } catch (error) {
        console.log(" error in updating usertype: ", error);
      }
    } else {
      console.log("please select a user type");
    }

    console.log(userType);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen  ">
      <div className="flex w-full gap-4 h-screen justify-center ">
        <div className="lg:w-1/2 flex flex-col  justify-evenly items-center  relative ">
          <h1
            onClick={handleBackHome}
            className="lg:text-2xl text-base font-semibold flex  top-0 absolute pop w-full p-3"
          >
            <img src="images/FoodBank.png" className=" w-5 lg:w-8 " />
            FoodConnect
          </h1>
          <Card
            color="transparent"
            className="rounded-none flex justify-center items-center h-fit w-80 max-w-screen-lg sm:w-96 "
            shadow={false}
          >
            <p
              variant="h4"
              className="text-dark flex-col flex leading-none w-full font-bold text-3xl pop mb-4"
            >
              <span className="font-medium text-black p-0 text-[16px]">
                Welcome:{" "}
              </span>
              {fullName}
            </p>
            <Typography
              variant="h5"
              className="text-black w-full font-bold text-2xl pop"
            >
              Select Your Role.
            </Typography>
            <Typography className="mt-1 pop text-sm text-dark font-normal ">
              Select whether you want to donate food or receive food items
              through <span className="font-medium">FoodConnect</span>
            </Typography>
            <form
              className="lg:mt-5 mt-4 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleUserTypeSubmit}
            >
              <div className="mb-0 flex w-full gap-3">
                <Button
                  onClick={() => setUserType("donor")}
                  className={`w-1/2 ${
                    userType === "donor"
                      ? "border-2 border-green-900"
                      : " border-none border-transparent"
                  } flex flex-col justify-center items-center text-2xl  font-bold pop h-28 bg-light-green-300 p-0  text-dark`}
                >
                  <FaHandHoldingHeart />
                  Donnor{" "}
                  <p className="normal-case font-normal text-xs ">
                    Post food items.
                  </p>
                </Button>
                <Button
                  onClick={() => setUserType("receiver")}
                  className={`w-1/2 p-0 ${
                    userType === "receiver"
                      ? "border-2 border-green-900"
                      : " border-none border-transparent"
                  } flex flex-col justify-center items-center text-2xl  font-bold pop h-28 bg-light-green-300 text-dark`}
                >
                  <FaShoppingBasket />
                  receiver
                  <p className=" normal-case font-normal text-xs ">
                    Claim food items.
                  </p>
                </Button>
              </div>
              <Button
                type="submit"
                className="mt-6 pop bg-gradient-to-tr from-[#094a10] to-[#054b0c] font-semibold capitalize"
                fullWidth
              >
                Continue
              </Button>
            </form>
          </Card>
        </div>
        <div className="w-1/2 hidden md:inline-block overflow-hidden bg-[url('images/D3.jpeg')] bg-center bg-cover bg-no-repeat"></div>
      </div>
    </div>
  );
}
