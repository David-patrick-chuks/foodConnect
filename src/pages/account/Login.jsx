import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import {
  Card,
  Input,
  Button,
  Typography,
  
} from "@material-tailwind/react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // Import getDoc
import Preloader from "../../components/Preloader";

function Login() {
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const navigate = useNavigate();

  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignin = async (values, { setSubmitting }) => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "FoodConnectUsers", user.uid); // Reference to the document
      const userDoc = await getDoc(userDocRef); // Fetch the document

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userType = userData.userType;
        if (userType === "donor") {
          navigate("/dashboard/donor");
        } else if (userType === "receiver") {
          navigate("/dashboard/receiver");
        }
      } else {
        alert("User is banned from using FoodConnect");
      }
      setLoading(false);
      toast.success("User logged in successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error(error.message);
      toast.error("Invalid Credential", {
        position: "bottom-center",
      });
      setLoading(false);
    }
    setSubmitting(false);
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent!", {
        position: "top-right",
      });
      setResetEmail("");
      setShowResetForm(false);
    } catch (error) {
      console.error(error.message);
      toast.error("Invalid Credential", {
        position: "bottom-center",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center w-full h-screen relative ">
        <ToastContainer />
        {loading && (
          <Preloader />
        )}
        <div className="flex w-full h-screen justify-center ">
          <div className="lg:w-1/2 flex items-center justify-center ">
            {showResetForm ? (
              <Card
                color="transparent"
                className="rounded-none flex justify-center items-center h-fit w-80 max-w-screen-lg sm:w-96 "
                shadow={false}
              >
                <form
                  onSubmit={handlePasswordReset}
                  className="lg:mt-5 mt-4 w-80 max-w-screen-lg sm:w-96"
                >
                  <div className="mb-4">
                    <Typography
                      variant="h4"
                      className="text-dark w-full text-center mb-2 font-bold text-2xl pop"
                    >
                      Reset Your Password{" "}
                      <span className="text-xl block">
                        {" "}
                        Enter your email address to receive a password reset
                        link
                      </span>
                    </Typography>
                    <Typography variant="h6" className="pop text-dark mb-1">
                      Email
                    </Typography>
                    <Input
                      size="lg"
                      name="resetEmail"
                      id="resetEmail"
                      autoComplete="off"
                      type="email"
                      onChange={(e) => setResetEmail(e.target.value)}
                      value={resetEmail}
                      placeholder="name@mail.com"
                      className=" !border-[#000000] focus:!border-2 text-dark"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="mt-3 bg-black pop capitalize"
                    fullWidth
                    disabled={loading}
                  >
                    Send Reset Email
                  </Button>
                  <Button
                    type="submit"
                    className="mt-2 bg-black pop capitalize"
                    fullWidth
                    onClick={() => setShowResetForm(false)}
                  >
                    Back to Login
                  </Button>
                </form>
              </Card>
            ) : (
              <Card
                color="transparent"
                className="rounded-none flex justify-center items-center h-fit w-80 max-w-screen-lg sm:w-96 "
                shadow={false}
              >
                <Typography
                  variant="h4"
                  className="text-dark w-full font-bold text-3xl pop"
                >
                  Sign In to <span className="text-amber-600">FoodConnect</span>
                </Typography>
                <Typography className="mt-2 pop w-full text-xs text-dark font-normal ">
                  Enter your details in to continue. Back? Click{" "}
                  <Link
                    className="text-yellow-900 font-medium hover:underline"
                    to={"/"}
                  >
                    here
                  </Link>
                </Typography>
                <Formik
                  initialValues={initialValue}
                  validationSchema={validationSchema}
                  onSubmit={handleSignin}
                >
                  {({ handleSubmit, handleChange, values, isSubmitting }) => (
                    <form
                      className="lg:mt-5 mt-4 w-80 max-w-screen-lg sm:w-96"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-0 flex flex-col gap-3">
                        <Typography
                          variant="h6"
                          className="pop text-dark -mb-3"
                        >
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
                        <Typography
                          variant="h6"
                          className="-mb-3 text-dark pop"
                        >
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
                      <Typography
                        className="-mb-3 mt-1 hover:underline text-xs w-full text-end font-normal cursor-pointer text-dark pop"
                        onClick={() => setShowResetForm(true)}
                      >
                        forgot password?
                      </Typography>
                      <Button
                        type="submit"
                        className="mt-6 bg-black pop capitalize"
                        fullWidth
                        disabled={isSubmitting || loading}
                      >
                        Sign in
                      </Button>
                      <Typography
                    color="gray"
                    className="mt-4 text-center font-normal pop text-base text-black"
                  >
                    DOn't have an account?{" "}
                    <Link to={"/signup"} className="font-semibold text-black ">
                      Sign Up
                    </Link>
                  </Typography>
                    </form>
                  )}
                </Formik>
              </Card>
            )}
          </div>
          <div className="w-1/2 hidden lg:inline-block overflow-hidden bg-[url('/images/login.jpg')] bg-center bg-cover bg-no-repeat"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
