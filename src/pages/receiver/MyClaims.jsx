import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../utils/firebase";

const MyClaims = () => {
  const [myClaims, setMyClaims] = useState([]);
  const [error, setError] = useState(null);

  const fetchMyClaims = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated.");

      const claimsQuerySnapshot = await getDocs(
        collection(db, "FoodConnectUsers", user.uid, "MyClaims")
      );

      const claimsArray = [];
      claimsQuerySnapshot.forEach((doc) => {
        const data = doc.data();
        // Convert Firebase Timestamp to JavaScript Date
        const claimedAtDate = data.claimedAt.toDate();
        claimsArray.push({ ...data, id: doc.id, claimedAt: claimedAtDate });
      });

      setMyClaims(claimsArray);
    } catch (error) {
      console.error("Error fetching claimed items:", error);
      setError("Failed to fetch claimed items.");
    }
  };

  const handleUnclaim = async (claim) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated.");

      // Remove from MyClaims
      const claimDocRef = doc(
        db,
        "FoodConnectUsers",
        user.uid,
        "MyClaims",
        claim.id
      );
      await deleteDoc(claimDocRef);

      // Update the claimedBy array in the original post
      const postDocRef = doc(
        db,
        "FoodConnectUsers",
        claim.userId,
        "MyPosts",
        claim.id
      );
      const postDoc = await getDoc(postDocRef);

      if (postDoc.exists()) {
        const claimedBy = postDoc
          .data()
          .claimedBy.filter((uid) => uid !== user.uid);
        await updateDoc(postDocRef, { claimedBy });
      }

      fetchMyClaims();
    } catch (error) {
      console.error("Error unclaiming item:", error);
      setError("Failed to unclaim item.");
    }
  };

  useEffect(() => {
    fetchMyClaims();
  }, []);

  return (
    <div>
      <h2>My Claimed Items</h2>
      {error && <p>{error}</p>}
      {myClaims.length > 0 ? (
        <table>
          <thead>
            <tr>
              <>
                <th>Item Name</th>
                <th>Description</th>
                <th>State</th>
                <th>Claimed At</th>
                <th>Actions</th>
              </>
            </tr>
          </thead>
          <tbody>
            {myClaims.map((claim, index) => (
              <tr key={index}>
                <>
                  <td>{claim.itemName}</td>
                  <td>{claim.description}</td>
                  <td>{claim.state}</td>
                  <td>{claim.claimedAt.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleUnclaim(claim)}
                      className="bg-red-500 text-white px-4 py-2"
                    >
                      Unclaim
                    </button>
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>You have no claimed items</p>
      )}
    </div>
  );
};

export default MyClaims;
