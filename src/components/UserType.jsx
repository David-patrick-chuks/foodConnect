import { Button, Card, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { FaDonate, FaHandHoldingHeart, FaShoppingBasket } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
export default function UserType() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("donor");
const [fullName, setFullName] = useState("");

  const handleBackHome = () => {
    navigate("/");
  };
  const handleUserTypeSubmit = (e) => {
    e.preventDefault();
    console.log(userType);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen  ">
        

      <div className="flex w-full gap-4 h-screen justify-center ">
        <div className="lg:w-1/2 flex flex-col lg:mb-[10%] mb-[65%] justify-between items-center ">
             <h1
        onClick={handleBackHome}
        className="lg:text-2xl text-base font-semibold flex pop w-full p-3"
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
                className="mt-6 bg-gradient-to-tr from-[#094a10] to-[#054b0c] capitalize"
                fullWidth
              >
                Sign in
              </Button>
            </form>
          </Card>
        </div>
        <div className="w-1/2 hidden md:inline-block overflow-hidden bg-[url('images/D3.jpeg')] bg-center bg-cover bg-no-repeat"></div>
      </div>
    </div>
  );
}
