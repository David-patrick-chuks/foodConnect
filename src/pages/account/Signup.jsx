import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Radio } from "@material-tailwind/react";
import { auth, db } from "../../utils/firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Preloader from "../../components/Preloader";

function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const initialValue = {
    fullName: "",
    email: "",
    password: "",
    userType: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    userType: Yup.string().required("Please select a user type"),
  });

  const handleSignup = async (values, { setSubmitting }) => {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      // console.log(user);

        await setDoc(doc(db, "FoodConnectUsers", user.uid), {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        userType: values.userType,
        userId: user.uid,
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      setLoading(false);
      // console.log("User is registered successfully");
      toast.success("User is registered successfully", {
        position: "top-center",
      });
      navigate(`/dashboard/${values.userType}`);
    } catch (error) {
      console.error(error.message);
      toast.error("Check your internet connection", {
        position: "bottom-center",
      });
      setLoading(false);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col relative items-center w-full h-screen  ">
      <ToastContainer />
      {loading && (
        <Preloader />
      )}
      <div className="flex w-full h-screen justify-center ">
        <div className="lg:w-1/2 text-black flex items-center justify-center ">
          <Card
            color="transparent"
            className="rounded-none flex justify-center items-center h-fit w-80 max-w-screen-lg sm:w-96 mt-7"
            shadow={false}
          >
            <Typography
              variant="h4"
              className="text-3xl text-black font-bold pop"
            >
              Join <span className="text-amber-600">FoodConnect</span>
            </Typography>
            <Typography className="mt-1 pop text-sm text-black font-normal  text-center">
              Sign up to get started. Click{" "}
              <Link
                className="text-yellow-600 font-medium hover:underline"
                to={"/"}
              >
                here
              </Link>{" "}
              to go back
            </Typography>
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={handleSignup}
            >
              {({ handleSubmit, handleChange, values, isSubmitting }) => (
                <form
                  className="mt-5 w-80 max-w-screen-lg sm:w-96"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-0 flex flex-col gap-3">
                    <Typography variant="h6" className="-mb-3 text-black pop ">
                      Full Name
                    </Typography>
                    <Input
                      autoComplete="off"
                      type="text"
                      size="lg"
                      id="fullName"
                      onChange={handleChange}
                      value={values.fullName}
                      placeholder="David Patrick"
                      className=" !border-[#000000] focus:!border-2 text-dark"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />

                    <ErrorMessage
                      name="fullName"
                      className="text-red-700"
                      component="div"
                    />
                    <Typography variant="h6" className="pop text-black -mb-3">
                      Email
                    </Typography>
                    <Input
                      size="lg"
                      name="email"
                      id="email"
                      autoComplete="off"
                      type="email"
                      onChange={handleChange}
                      value={values.email}
                      placeholder="name@mail.com"
                      className=" !border-[#000000] focus:!border-2 text-dark"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <ErrorMessage
                      name="email"
                      className="text-red-700"
                      component="div"
                    />
                    <Typography variant="h6" className="-mb-3 text-black pop">
                      Password
                    </Typography>
                    <Input
                      autoComplete="off"
                      type="password"
                      size="lg"
                      name="password"
                      id="password"
                      onChange={handleChange}
                      value={values.password}
                      placeholder="********"
                      className=" !border-[#000000] focus:!border-2 text-dark"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <ErrorMessage
                      name="password"
                      className="text-red-700"
                      component="div"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="block text-black mb-2">
                      Select whether you want to donate food or receive food
                      items through{" "}
                      <span className="font-semibold text-amber-700">
                        FoodConnect
                      </span>
                    </label>
                    <div className="flex items-center">
                      <Radio
                        type="radio"
                        id="donor"
                        name="userType"
                        value="donor"
                        label="Donor"
                        checked={values.userType === "donor"}
                        onChange={handleChange}
                      />
                      <Radio
                        type="radio"
                        id="receiver"
                        name="userType"
                        value="receiver"
                        checked={values.userType === "receiver"}
                        onChange={handleChange}
                        label="Receiver"
                      />
                    </div>

                    <ErrorMessage
                      name="userType"
                      className="text-red-700"
                      component="div"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="mt-2 capitalize bg-black pop"
                    fullWidth
                    disabled={isSubmitting || loading}
                  >
                    sign up
                  </Button>
                  <Typography
                    color="gray"
                    className="mt-4 text-center font-normal pop text-base text-black"
                  >
                    Already have an account?{" "}
                    <Link to={"/signin"} className="font-semibold text-black ">
                      Sign In
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Card>
        </div>
        <div className="w-1/2 hidden lg:inline-block overflow-hidden bg-[url('/images/signup.jpg')] bg-center bg-cover  bg-amber-100 bg-no-repeat"></div>
      </div>
    </div>
  );
}

export default Signup;
