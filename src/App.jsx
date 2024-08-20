import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Home } from "./pages/homepage/Home";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { NotFound } from "./components/NotFound";
import { FooterContent } from "./components/FooterContent";
import About from "./pages/about/About";
import Works from "./pages/works/Works";
import Contact from "./pages/contact/Contact";
import Signup from "./pages/account/Signup";
import Login from "./pages/account/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Donor from "./pages/donor/Donor";
import ManagePosts from "./pages/donor/ManagePosts";
import MessageD from "./pages/donor/MessageD";
import NotifyD from "./pages/donor/NotifyD";
import PostItem from "./pages/donor/PostItem";
import Profile from "./pages/donor/Profile";
import Receiver from "./pages/receiver/Receiver";
import ClaimFood from "./pages/receiver/ClaimFood";
import MyClaims from "./pages/receiver/MyClaims";
import ProfileR from "./pages/receiver/ProfileR";
import NotifyR from "./pages/receiver/NotifyR";
import MessageR from "./pages/receiver/MessageR";
import DonorProfile from "./pages/receiver/DonorProfile";
import Preloader from "./components/Preloader";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import ReceiverProfile from "./pages/donor/ReceiverProfile";
import ChatD from "./pages/donor/ChatD";
import ChatR from "./pages/receiver/ChatR";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start as true to show preloader initially
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = doc(db, "FoodConnectUsers", currentUser.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserType(data.userType);
            setUser(currentUser);
          }
        } catch (error) {
          console.log("Error while getting user data:", error.message);
        }
      } else {
        setUser(null);
        setUserType("");
      }
      setLoading(false); // Set loading to false once data fetching is done
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      {!user ? (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/how-it-works" element={<Works />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/:id" element={<FooterContent />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            {userType === "donor" && (
              <>
                <Route path="donor" element={<Donor />} />
                <Route path="donor-profile" element={<Profile />} />
                <Route path="manage-posts" element={<ManagePosts />} />
                <Route
                  path="donor-notifications/:receiverId"
                  element={<ReceiverProfile />}
                />
                <Route path="donor-messages" element={<MessageD />} />
                <Route
                  path="donor-messages/:ChatId"
                  element={<ChatD />}
                />
                <Route path="donor-notifications" element={<NotifyD />} />
                <Route path="post-item" element={<PostItem />} />
              </>
            )}
            {userType === "receiver" && (
              <>
                <Route path="receiver" element={<Receiver />} />
                <Route path="claim-food" element={<ClaimFood />} />
                <Route path="claim-food/:donorId" element={<DonorProfile />} />
                <Route path="my-claims" element={<MyClaims />} />
                <Route path="receiver-profile" element={<ProfileR />} />
                <Route path="receiver-messages" element={<MessageR />} />
                <Route path="receiver-messages/:ChatId" element={<ChatR />} />
                <Route path="receiver-notifications" element={<NotifyR />} />
              </>
            )}
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      )}
    </>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
