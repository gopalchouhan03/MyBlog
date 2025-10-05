import { useOutletContext } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardItem from "./CardItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cards = () => {
  const { post, loader } = useOutletContext();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = user?.id;
 

  const handleLike = async (postId, setLikes, setLiked) => {
  try {
    const res = await axios.post(`/api/posts/${postId}/like`, { userId: currentUser._id });
    console.log(res.data)
    if (res.data.success) {
      setLikes(res.data.likesCount);   // backend should return updated likes count
      setLiked(res.data.liked);        // backend should return whether current user liked
    }
  } catch (err) {
    console.error("Error liking post:", err);
  }
};


  const handleReadMore = async (id) => {
    try {
      const res = await axios.get(`/api/readmorepost/${id}`);
      const fullPost = res.data.data;
      navigate("/readmore", { state: { fullPost, user } });
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  return (
    <>
      {loader === false ? (
        <div className="w-11/12 max-w-6xl mx-auto mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {post && post.length > 0 ? (
            post.map((item, index) => (
              <CardItem
                key={item?._id || index}
                item={item}
                index={index}
                userId={userId}
                handleReadMore={handleReadMore}
                handleLike={handleLike}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No posts available</p>
          )}
        </div>)
        : (<div className="flex items-center justify-center h-screen">
          <div className="w-20 h-20 border-8 border-t-pink-500 border-r-blue-500 border-b-pink-500 border-l-blue-500 rounded-full animate-spin"></div></div>)}
    </>

  );
};

export default Cards;
