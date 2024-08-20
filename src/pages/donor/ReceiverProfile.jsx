import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

const ReceiverProfile = () => {
  const [receiverData, setReceiverData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReceiverProfile = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated.");

      const docRef = doc(db, "FoodConnectUsers", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setReceiverData(docSnap.data());
      } else {
        throw new Error("No such document!");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching receiver profile:", err);
      setError("Failed to load profile data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceiverProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Receiver Profile</h2>
      {receiverData ? (
        <div className="profile-container">
          <p>
            <strong>Full Name:</strong> {receiverData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {receiverData.email}
          </p>
          <p>
            <strong>User Type:</strong> {receiverData.userType}
          </p>
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default ReceiverProfile;
