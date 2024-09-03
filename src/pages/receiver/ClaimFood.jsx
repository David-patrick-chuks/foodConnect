import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import your Firebase auth and db
import {
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

const ClaimFood = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Search and Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("latest");

  // Fetch all posts from Firestore
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
              const postData = postDoc.data();

              // Convert the postedAt string to a Date object for sorting
              const postedAtDate = new Date(postData.postedAt);

              allPostsArray.push({
                ...postData,
                postedAt: postedAtDate,
                id: postDoc.id,
                userId,
                donor: {
                  fullName: userData.fullName || "Unknown Donor",
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
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (post) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated.");

      const userDocRef = doc(db, "FoodConnectUsers", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const now = new Date();
        const lastClaimTime = userData.lastClaimTime
          ? userData.lastClaimTime.toDate()
          : null;

        // Check if 24 hours have passed since the last claim
        const hoursSinceLastClaim = lastClaimTime
          ? Math.abs(now - lastClaimTime) / 36e5
          : null;
        let claimsToday = userData.claimsToday || 0;

        if (hoursSinceLastClaim >= 24 || !lastClaimTime) {
          claimsToday = 0; // Reset claim count if 24 hours have passed or first claim
        }

        if (claimsToday >= 3) {
          setError("You have reached the limit of 3 claims per day.");
          return;
        }

        // Allow the user to claim the item
        const postDocRef = doc(
          db,
          "FoodConnectUsers",
          post.userId,
          "MyPosts",
          post.id
        );
        const postDoc = await getDoc(postDocRef);

        if (postDoc.exists()) {
          const postData = postDoc.data();
          const claimedBy = postData.claimedBy || [];
          const claimCount = claimedBy.length;

          // Check if claim limit is reached
          if (claimCount < postData.recipients) {
            if (!claimedBy.some((claim) => claim.userId === user.uid)) {
              const newClaimer = {
                userId: user.uid,
                fullName: userData.fullName || "Unknown User",
                timestamp: now,
                claimMessage: `${userData.fullName} claimed ${postData.itemName}.`,
              };

              claimedBy.push(newClaimer);

              await updateDoc(postDocRef, {
                claimedBy,
                claims: claimCount + 1,
              });

              const myClaimsDocRef = doc(
                db,
                "FoodConnectUsers",
                user.uid,
                "MyClaims",
                post.id
              );
              await setDoc(myClaimsDocRef, {
                ...postData,
                claimedAt: now,
                status: "pending",
                viewed: false,
              });

              // Save the notification
              const notificationDocRef = doc(collection(db, "Notifications"));
              await setDoc(notificationDocRef, {
                claimedBy: user.uid,
                donorAvatarURL: postData.donorAvatar || "/images/Avatar.png",
                donorFullName: postData.donorName || "Unknown Donor",
                donorId: post.userId,
                message: `${userData.fullName} has claimed your item ${postData.itemName}.`,
                postId: post.id,
                receiverAvatarURL: userData.avatarUrl || "/images/Avatar.png",
                receiverFullName: userData.fullName || "Unknown User",
                timestamp: now.toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
                viewed: false,
                postImages: postData.imageUrls || [],
              });

              // Update user claim count and last claim time
              await updateDoc(userDocRef, {
                claimsToday: claimsToday + 1,
                lastClaimTime: now,
              });

              setError(null);
              fetchAllPosts(); // Reload posts after successful claim
            }
          } else {
            setError("Claim limit reached for this item.");
          }
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

  // Sorting Logic
  const sortPosts = (posts) => {
    if (sortOption === "latest") {
      return posts.sort((a, b) => b.postedAt - a.postedAt);
    } else if (sortOption === "oldest") {
      return posts.sort((a, b) => a.postedAt - b.postedAt);
    } else if (sortOption === "state") {
      return posts.sort((a, b) => a.state.localeCompare(b.state));
    }
    return posts;
  };

  // Filtered and Sorted Posts
  const filteredPosts = sortPosts(
    allPosts.filter((post) =>
      [post.itemName, post.state, post.description]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-amber-600">
        Claim Food Items
      </h2>

      {/* Search and Sort Section */}
      <div className="flex justify-between items-center mb-6 bg-gray-100 p-4 rounded-lg shadow-sm">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by state, item name, or description"
          className="border p-2 rounded-lg w-full max-w-xs shadow-sm focus:outline-none focus:ring focus:border-amber-600"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded-lg ml-4 shadow-sm focus:outline-none focus:ring focus:border-amber-600"
        >
          <option value="latest">Latest Post</option>
          <option value="oldest">Oldest Post</option>
          <option value="state">Sort by State</option>
        </select>
      </div>

      {loading && <p className="text-center text-amber-600">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {currentPosts.length > 0
        ? currentPosts.map((post, index) => {
            const user = auth.currentUser;
            const isClaimed = user && isClaimedByUser(post, user.uid);
            const claimCount = post.claimedBy ? post.claimedBy.length : 0;

            return (
              <div
                key={index}
                className="mb-6 border p-4 rounded-lg bg-white shadow-md"
              >
                <div className="flex items-center mb-4">
                  <Link to={`/dashboard/claim-food/${post.userId}`}>
                    <img
                      src={post.donor.avatarUrl}
                      alt="Donor Avatar"
                      className="w-12 h-12 rounded-full object-cover mr-4 cursor-pointer"
                    />
                  </Link>
                 
                  <p className="font-bold text-amber-600">
                    {post.donor.fullName}
                  </p>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {post.itemName || "No item name"}
                </h3>
                <p className="text-gray-600">
                  {post.description || "No description available"}
                </p>
                <div className="flex gap-5 mt-2 text-sm text-gray-500">
                  <p>{post.state || "No state provided"}</p>
                  <p>
                    Posted at:{" "}
                    {post.postedAt.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {post.imageUrls && post.imageUrls.length > 0 && (
                  <div className="flex w-full mt-4 gap-4">
                    {post.imageUrls.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Food item ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg shadow-sm"
                      />
                    ))}
                  </div>
                )}
                <p className="mt-2 text-gray-500">
                  {claimCount > 0 && (
                    <span>
                      {isClaimed && claimCount === 1
                        ? `You claimed this item`
                        : `Claimed by ${claimCount} others`}
                    </span>
                  )}
                </p>
                {!isClaimed ? (
                  <button
                    onClick={() => handleClaim(post)}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg mt-4 shadow-md transition duration-300"
                    disabled={post.claims === post.recipients}
                  >
                    Claim Now
                  </button>
                ) : (
                  <button
                    className="bg-gray-400 text-white px-6 py-2 rounded-lg mt-4 shadow-md"
                    disabled
                  >
                    Claimed
                  </button>
                )}
              </div>
            );
          })
        : !loading && (
            <p className="text-center text-gray-500">No posts available.</p>
          )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-lg shadow-md transition duration-300"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-600">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-lg shadow-md transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClaimFood;
