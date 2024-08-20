import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

const ClaimFood = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const userQuerySnapshot = await getDocs(
        collection(db, "FoodConnectUsers")
      );
      const allPostsArray = [];

      for (const userDoc of userQuerySnapshot.docs) {
        const userId = userDoc.id;
        const userData = userDoc.data();

        try {
          const postsQuerySnapshot = await getDocs(
            collection(db, "FoodConnectUsers", userId, "MyPosts")
          );

          if (!postsQuerySnapshot.empty) {
            postsQuerySnapshot.forEach((postDoc) => {
              allPostsArray.push({
                ...postDoc.data(),
                id: postDoc.id,
                userId,
                donor: {
                  fullName: userData.fullName,
                  avatarUrl: userData.avatarUrl || "/images/Avatar.png",
                },
              });
            });
          }
        } catch (error) {
          console.error(`Error fetching posts for user ${userId}:`, error);
        }
      }

      setAllPosts(allPostsArray);
      if (allPostsArray.length === 0) {
        setError("No posts found for any users.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data.");
      setLoading(false);
    }
  };

const handleClaim = async (post) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated.");

    const postDocRef = doc(
      db,
      "FoodConnectUsers",
      post.userId,
      "MyPosts",
      post.id
    );
    const postDoc = await getDoc(postDocRef);

    if (postDoc.exists()) {
      const claimedBy = postDoc.data().claimedBy || [];
      if (!claimedBy.some((claim) => claim.userId === user.uid)) {
        // Fetch the user's information
        const userDocRef = doc(db, "FoodConnectUsers", user.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        // Fetch the donor's information
        const donorDocRef = doc(db, "FoodConnectUsers", post.userId);
        const donorDoc = await getDoc(donorDocRef);
        const donorData = donorDoc.data();

        const newClaimer = {
          userId: user.uid,
          fullName: userData.fullName,
          claimedAt: new Date(),
        };

        claimedBy.push(newClaimer);

        await updateDoc(postDocRef, { claimedBy });

        // Add to user's MyClaims collection
        const myClaimsDocRef = doc(
          db,
          "FoodConnectUsers",
          user.uid,
          "MyClaims",
          post.id
        );
        await setDoc(myClaimsDocRef, { ...post, claimedAt: new Date() });

        // Add notification for the donor
        const notification = {
          message: `${userData.fullName} has claimed your item ${post.itemName}.`,
          claimedBy: user.uid,
          receiverAvatarURL: userData.avatarUrl || "/images/Avatar.png",
          donorAvatarURL: donorData.avatarUrl || "/images/Avatar.png",
          donorId: post.userId,
          postId: post.id,
          timestamp: new Date(),
          viewed: false,
          receiverFullName: userData.fullName,
          donorFullName: donorData.fullName,
        };
        await addDoc(collection(db, "Notifications"), notification);

        fetchAllPosts();
      }
    }
  } catch (error) {
    console.error("Error claiming post:", error);
    setError("Failed to claim the item.");
  }
};


  const isClaimedByUser = (post, userId) => {
    return (
      post.claimedBy && post.claimedBy.some((claim) => claim.userId === userId)
    );
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Pagination calculations
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  return (
    <div>
      <h2>Claim Food Items</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {currentPosts.length > 0
        ? currentPosts.map((post, index) => {
            const user = auth.currentUser;
            const isClaimed = user && isClaimedByUser(post, user.uid);
            const claimCount = post.claimedBy ? post.claimedBy.length : 0;

            return (
              <div key={index} className="mb-4 border p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <Link to={`/dashboard/claim-food/${post.userId}`}>
                    <img
                      src={post.donor.avatarUrl}
                      alt="Donor Avatar"
                      className="w-10 h-10 rounded-full object-cover mr-4 cursor-pointer"
                    />
                  </Link>
                  <p className="font-bold">{post.donor.fullName}</p>
                </div>
                <h3 className="text-lg font-semibold">{post.itemName}</h3>
                <p>{post.description}</p>
                <div className="flex gap-5">
                  <p>{post.state}</p>
                  <p>Posted at: {post.postedAt}</p>
                </div>
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
                <button
                  onClick={() => handleClaim(post)}
                  disabled={isClaimed}
                  className={`mt-2 px-4 py-2 ${
                    isClaimed ? "bg-gray-400" : "bg-blue-500"
                  } text-white`}
                >
                  {isClaimed ? "Claimed" : "Claim"}
                </button>

                {claimCount > 0 && (
                  <div>
                    <p>
                      {isClaimed
                        ? `You and ${claimCount - 1} others claimed this item`
                        : `${claimCount} others have claimed this item`}
                    </p>
                    <p>Claimed by:</p>
                    <ul>
                      {post.claimedBy.map((claimer, i) => (
                        <li key={i}>{claimer.fullName}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        : !error && <p>No posts available</p>}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 disabled:bg-gray-200"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClaimFood;
