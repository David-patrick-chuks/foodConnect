import { useEffect, useState } from "react";
import { auth, db } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import SIdebar from "../../components/dashPart/SIdebar";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/dashPart/Header";
import { signOut } from "firebase/auth";
import Preloader from "../../components/Preloader";

export default function Dashboard() {
  const [userType, setUserType] = useState("" || "receiver");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [sidebarNav, setSidebarNav] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const fetchUserType = async () => {
          try {
            const userDoc = doc(db, "FoodConnectUsers", currentUser.uid);
            const docSnap = await getDoc(userDoc);
            if (docSnap.exists()) {
              setUserType(docSnap.data().userType);
            }
          } catch (error) {
            console.log("Error while getting user type:", error.message);
          } finally {
            setLoading(false);
          }
        };
        fetchUserType();
      } else {
        setLoading(false);
        navigate("/signin"); // Redirect if user is not authenticated
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
    setSidebarNav((prev) => {
      return !prev;
    });
  };

  // if (loading) {
  //   return <Preloader />; // Or a custom loader component
  // }
  const handleSidebarNav = () => {
    setSidebarNav((prev) => {
      return !prev;
    });
  };
  return (
    <div className="flex flex-row w-full h-screen">
      <SIdebar
        loading={loading}
        userType={userType}
        sidebarNav={sidebarNav}
        handleSignOut={handleSignOut}
        handlecloseNav={handleSidebarNav}
      />
      <div className=" w-full ">
        <Header handleSidebarNav={handleSidebarNav} />
        <main className="flex w-full h-[90dvh] overflow-scroll ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
