import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../utils/firebase";
import { Button, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import Preloader from "../../components/Preloader";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("User not found");
        }

        const myPostsCollectionRef = collection(
          db,
          "FoodConnectUsers",
          user.uid,
          "MyPosts"
        );
        const postsSnapshot = await getDocs(myPostsCollectionRef);

        const fetchedPosts = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to fetch posts. Please try again.");
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not found");
      }

      const postDocRef = doc(
        db,
        "FoodConnectUsers",
        user.uid,
        "MyPosts",
        postId
      );
      await deleteDoc(postDocRef);

      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const handleReadMore = (id) => {
    const modalPost = posts.find((post) => post.id === id);
    setModalData(modalPost);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="p-5">
      {modalOpen && (
        <div className="fixed pop inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-gray-800 opacity-50"
            onClick={closeModal}
          ></div>

          <div className="bg-white relative px-3 pt-3 rounded-lg shadow-lg overflow-scroll h-fit max-h-[90dvh] z-10 md:w-[80%] w-[90%]">
            <span
              onClick={closeModal}
              className="fixed right-0 z-50 bg-[#f8bc18] text-white rounded-md top-0 text-2xl m-4"
            >
              <IoClose />
            </span>
            <div
              key={modalData.id}
              className="border p-4 gap-5 w-full flex md:flex-row flex-col justify-between rounded-lg relative"
            >
              <div className="w-full flex flex-col justify-between overflow-scroll">
                <div>
                  <Typography
                    variant="h6"
                    className="font-bold text-2xl pop capitalize bg-white text-black border-b mb-2"
                  >
                    <div className="grid mr-2 mb-2 rounded-lg border gap-1 border-white shadow-md overflow-hidden bg-amber-100 w-1/2 grid-cols-3 grid-rows-2 float-left md:h-[60dvh]">
                      <img
                        src={modalData.imageUrls[0]}
                        className="w-full h-full col-span-2 row-span-2 object-cover"
                      />
                      <img
                        src={modalData.imageUrls[1]}
                        className="w-full h-full object-cover"
                      />{" "}
                      <img
                        src={modalData.imageUrls[2]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {modalData.itemName}
                  </Typography>
                  <p className="text-black/70 mb-2 text-xs ">
                    {modalData.description}
                  </p>
                  <div className="flex border-t border-gray-200 justify-between text-base">
                    <p className="text-black text-sm font-medium">
                      {modalData.state} State
                    </p>
                    <p className="text-sm font-medium">
                      Posted at: {modalData.postedAt}
                    </p>
                  </div>
                </div>
                <Button
                  className="mt-4 bg-amber-600 pop capitalize"
                  fullWidth
                  onClick={() => handleDelete(modalData.id)}
                  disabled={loading}
                >
                  Delete Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      <Typography variant="h4" className="text-dark font-bold text-2xl mb-4">
        Manage Your Posts
      </Typography>
      {loading && <Preloader />}
      <div className="grid grid-cols-1 gap-4">
        {posts.length === 0 ? (
          <div>No posts available</div>
        ) : (
          <div>
            {posts.map((post) => (
              <div
                key={post.id}
                className="border p-4 gap-5 w-full md:h-[50dvh] flex md:flex-row flex-col justify-between rounded-lg"
              >
                <div
                  className="grid rounded-lg border gap-1 border-white shadow-md overflow-hidden bg-amber-50 w-full grid-cols-3 grid-rows-2 "
                  onClick={() => handleReadMore(post.id)}
                >
                  <img
                    src={post.imageUrls[0]}
                    className="w-full h-full col-span-2 row-span-2 object-cover"
                  />
                  <img
                    src={post.imageUrls[1]}
                    className="w-full h-full object-cover"
                  />{" "}
                  <img
                    src={post.imageUrls[2]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full flex flex-col justify-between">
                  <div>
                    <Typography
                      variant="h6"
                      className="font-bold text-2xl pop capitalize text-black"
                    >
                      {post.itemName}
                    </Typography>
                    <p className="text-black/70 mb-2 text-xs ">
                      {post.description.length <= 500 ? (
                        post.description
                      ) : (
                        <span>
                          {`${post.description.slice(0, 500)}...`}{" "}
                          <span
                            className="text-black font-medium"
                            onClick={() => handleReadMore(post.id)}
                          >
                            read more
                          </span>
                        </span>
                      )}
                    </p>
                    <div className="flex border-t border-gray-200 justify-between text-base">
                      <p className="text-black text-sm font-medium">
                        {post.state} State
                      </p>
                      <p className="text-sm font-medium">
                        Posted at: {post.postedAt}
                      </p>
                    </div>
                    <p className="text-black text-sm font-medium mt-2">
                      Number of Claims: {post.claimedBy?.length || 0}
                    </p>
                  </div>
                  <Button
                    className="mt-4 bg-amber-600 pop capitalize"
                    fullWidth
                    onClick={() => handleDelete(post.id)}
                    disabled={loading}
                  >
                    Delete Post
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePosts;
