import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Home } from "./pages/homepage/Home";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { NotFound } from "./components/NotFound";
import { FooterContent } from "./components/FooterContent";
import About from "./pages/about/About";
import Works from "./pages/works/Works";
import Contact from "./pages/contact/Contact";
import Login from "./pages/account/Login";
import Signup from "./pages/account/Signup";
import Profile from "./pages/account/Profile";
import { auth } from "./utils/firebase";
import FoodConnectSignUp from "./pages/account/FoodConnectSignUp";
import UserType from "./components/UserType";
import Receiver from "./pages/dashboard/receiver/Receiver";
/// Import custom styles for nprogress

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const noNavBarFooterPath = ["/signup", "/login", "/user-type"];

  useEffect(() => {
    // Monitor authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   // Start nprogress bar on route change start
  //   NProgress.start();

  //   // Complete nprogress bar on route change complete
  //   NProgress.done();
  // }, [location]);

  return (
    <>
      {noNavBarFooterPath.includes(location.pathname) ? null : <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/user-type" element={<UserType />} />
        <Route path="/newform" element={<FoodConnectSignUp />} />
        <Route path="/how-it-works" element={<Works />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/:id" element={<FooterContent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Receiver />} />
        <Route
          path="/login"
          // element={user ? <Navigate to="/profile" /> : <Login />}
          element={<Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {noNavBarFooterPath.includes(location.pathname) ? null : <Footer />}
    </>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
