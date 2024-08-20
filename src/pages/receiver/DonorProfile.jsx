import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const DonorProfile = () => {
  const { donorId } = useParams();
  const [donorData, setDonorData] = useState(null);
  const [donorPosts, setDonorPosts] = useState([]);
  const [loading, setLoading] = useState(true);  // Initialize with true
  const [error, setError] = useState(null);
  console.log(donorId);

  const fetchDonorData = async () => {
    try {
      const donorDocRef = doc(db, "FoodConnectUsers", donorId);
      const donorDoc = await getDoc(donorDocRef);

      if (donorDoc.exists()) {
        setDonorData(donorDoc.data());
      } else {
        setError("Donor not found.");
        return;
      }

      const postsQuerySnapshot = await getDocs(
        collection(db, "FoodConnectUsers", donorId, "MyPosts")
      );

      const postsArray = [];
      postsQuerySnapshot.forEach((postDoc) => {
        postsArray.push({ ...postDoc.data(), id: postDoc.id });
      });

      setDonorPosts(postsArray);
    } catch (error) {
      console.error("Error fetching donor data:", error);
      setError("Failed to fetch donor data.");
    } finally {
      setLoading(false);  // Ensure loading state is set to false in finally block
    }
  };

  useEffect(() => {
    fetchDonorData();
  }, [donorId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {donorData ? (
        <>
          <div className="flex items-center">
            <img
              src={donorData.avatarUrl || "/images/Avatar.png"}
              alt="Donor Avatar"
              className="w-20 h-20 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold">{donorData.fullName}</h2>
              <p>Email: {donorData.email}</p>
              {/* <p>Location: {donorData.location}</p> */}
            </div>
          </div>

          <h3 className="mt-6 text-lg font-semibold">Posts by {donorData.fullName}</h3>
          {donorPosts.length > 0 ? (
            donorPosts.map((post) => (
              <div key={post.id} className="mb-4 border p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{post.itemName}</h3>
                <p>{post.description}</p>
                <div className="flex w-[75%] mt-4">
                  {post.imageUrls.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      className="w-[25%] object-cover"
                      alt={`Food item ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No posts available from this donor.</p>
          )}
        </>
      ) : (
        <p>Donor data not found.</p>
      )}
    </div>
  );
};


export default DonorProfile;
