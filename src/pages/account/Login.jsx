import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ImHome } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");

      toast.success("User logged in successfully", {
        position: "top-center",
        onClose: () => {},
      });
      window.location.href = "/profile";
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center w-full h-screen relative ">
        <div className="w-full absolute  top-0 z-50 rounded-b-lg  bg-gradient-to-tr from-green-700 to-green-900 shadow-md text-white px-3 items-center justify-between flex flex-row-reverse py-3 lg:py-2 cursor-pointer ">
          <h1
            onClick={handleBackHome}
            className="lg:text-2xl text-base font-semibold flex pop items-center"
          >
            <img src="images/FoodBank.png" className=" w-5 lg:w-8 " />
            FoodConnect
          </h1>{" "}
          <p
            className="flex  font-medium p-0 leading-none pop gap-1"
            onClick={handleBackHome}
          >
            <ImHome />
            Home
          </p>
        </div>
        <div className="flex w-full h-screen   justify-center ">
          <div className="lg:w-1/2 flex items-center justify-center ">
            <Card
              color="transparent"
              className="rounded-none flex justify-center items-center h-fit w-80 max-w-screen-lg sm:w-96 "
              shadow={false}
            >
              <Typography variant="h4" className="text-dark w-full font-bold text-4xl pop">
                Sign in.
              </Typography>
              <Typography className="mt-2 pop text-sm text-dark font-normal ">
                Sign in to manage your profile and Food Connections
              </Typography>
              <form
                className="lg:mt-5 mt-4 w-80 max-w-screen-lg sm:w-96"
                onSubmit={handleSignin}
              >
                <div className="mb-0 flex flex-col gap-3">
                  <Typography variant="h6" className="pop text-dark -mb-3">
                    Email
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="name@mail.com"
                    className=" !border-[#05380a] focus:!border-2 text-dark"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Typography variant="h6" className="-mb-3 text-dark pop">
                    Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-[#05380a] focus:!border-2 text-dark "
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Typography  className="-mb-3  w-full text-end font-normal cursor-pointer text-dark pop">
                    forgot password?
                  </Typography>
                <Button type="submit"
                  className="mt-6 bg-gradient-to-tr from-[#094a10] to-[#054b0c] capitalize"
                  fullWidth
                >
                  Sign in
                </Button>
              </form>
            </Card>
          </div>
          <div className="w-1/2 hidden lg:inline-block overflow-hidden bg-[url('images/D3.jpeg')] bg-center bg-cover bg-no-repeat"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
