import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
 // Adjust the path as needed

const DonorProfileModal = ({ notification, closeModal }) => {
  const [donorProfile, setDonorProfile] = useState(null);

  useEffect(() => {
    fetchDonorProfile();
  }, []);

  const fetchDonorProfile = async () => {
    const donorDoc = await getDoc(
      doc(db, "FoodConnectUsers", notification.donorId)
    );
    if (donorDoc.exists()) {
      setDonorProfile(donorDoc.data());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-96 shadow-lg relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-xl">
          &times;
        </button>
        {donorProfile ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{donorProfile.fullName}</h2>
            <p className="text-sm mb-4">
              {donorProfile.bio || "No bio available"}
            </p>
            <div className="flex justify-between">
              <span
                className={`py-1 px-3 rounded-lg ${
                  notification.status === "accepted"
                    ? "bg-green-500"
                    : "bg-red-500"
                } text-white`}
              >
                {notification.status}
              </span>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DonorProfileModal;
