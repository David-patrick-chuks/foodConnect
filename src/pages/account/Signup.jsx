import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ImHome } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "FoodConnectUsers", user.uid), {
          email: user.email,
          fullName: fullName,
          fcUserType: "",
          userId: user.uid,
          createdAt: new Date().toLocaleDateString("en-US", {month: "short", day: "2-digit", year: "numeric"})
        });
      }
      console.log("User is registered successfully");
      toast.success("User is registered successfully", {
        position: "top-center",
      });
      navigate("/user-type");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen relative  ">
      <div className="  w-full absolute top-0 z-50 rounded-b-lg  bg-gradient-to-tr from-green-700 to-green-900 shadow-md text-white px-3 items-center justify-between flex flex-row-reverse py-3 lg:py-2 cursor-pointer ">
        <h1 onClick={handleBackHome} className="lg:text-2xl text-base font-semibold flex pop items-center">
          <img src="images/FoodBank.png" className=" w-5 lg:w-8 " />
          FoodConnect
        </h1>
        {" "}
        <p
          className="flex  font-medium p-0 leading-none pop gap-1"
          onClick={handleBackHome}
        >
          <ImHome />Home
        </p>
      </div>
      <div className="flex w-full h-screen   justify-center ">
        <div className="lg:w-1/2 flex items-center justify-center ">
          <Card
            color="transparent"
            className="rounded-none flex justify-center items-center h-fit w-80 max-w-screen-lg sm:w-96 "
            shadow={false}
          >
            <Typography variant="h4" className="text-dark font-bold pop">
              Create Account
            </Typography>
            <Typography className="mt-1 pop text-sm text-dark font-normal  text-center">
              Donate food or receive from others on FoodConnect
            </Typography>
            <form
              className="mt-5 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSignup}
            >
              <div className="mb-0 flex flex-col gap-3">
                <Typography variant="h6" className="-mb-3 text-dark pop ">
                  Full Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="David Patrick"
                  className=" !border-[#05380a] focus:!border-2 text-dark"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
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
              <Checkbox
                defaultChecked
                className="checked:bg-dark"
                label={
                  <Typography
                    variant="small"
                    className="flexitems-center font-normal text-black pop"
                  >
                    I agree the
                    <Link
                      to={"#"}
                      className="font-medium transition-colors text-dark hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </Link>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
              <Button type="submit"
                className="mt-2 bg-gradient-to-tr from-[#094a10] to-[#054b0c] capitalize"
                fullWidth
              >
                sign up
              </Button>
              <Typography
                color="gray"
                className="mt-4 text-center font-normal pop text-base text-black"
              >
                Already have an account?{" "}
                <Link to={"/login"} className="font-semibold text-dark ">
                  Sign In
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
        <div className="w-1/2 hidden lg:inline-block overflow-hidden bg-[url('images/shrek.jpg')] bg-center bg-cover bg-no-repeat"></div>
      </div>
    </div>
  );
}

export default Signup;
