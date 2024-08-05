import { auth, db } from "../../utils/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      //   console.log(user);
      const docRef = doc(db, "FoodConnectUsers", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("user is not login in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const handleSignout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("user logged out successfully");
    } catch (error) {
      console.log(error.message, "ERROR IN LOGGING OUT");
    }
  };

  return (
    <div>
      {userDetails ? (
        <div>
          <h1>Welcome {userDetails.firstname}</h1>
          <div className="pt-3">
            <h1> user Email ::: {userDetails.email}</h1>
            <h1> user Fullname ::: {userDetails.fullName}</h1>
          </div>
          <button onClick={handleSignout}>Log out </button>
        </div>
      ) : (
        <p> loading</p>
      )}
    </div>
  );
}
export default Profile;
