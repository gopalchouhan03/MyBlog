import { useOutletContext } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CardItem from "./CardItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = 'https://myblog-backend-t9rr.onrender.com/api';

const Cards = () => {
  const { post, loader } = useOutletContext();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = user?.id;

  const handleLike = async (postId, setLikes, setLiked) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/posts/${postId}/like`, { userId });
      if (res.data) {
        setLikes(res.data.likes);
        setLiked(res.data.liked);
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleReadMore = async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/readmorepost/${id}`);
      const fullPost = res.data.data;
      navigate("/readmore", { state: { fullPost, user } });
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  return (
    <>
      {!loader ? (
        <div className="min-h-screen pt-16 sm:pt-20 pb-8">
          {/* Header Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                Discover Stories
              </h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                Explore inspiring articles and engaging content from writers around the world.
              </p>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {post && post.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
                {post.map((item, index) => (
                  <CardItem
                    key={item?._id || index}
                    item={item}
                    index={index}
                    userId={userId}
                    handleReadMore={handleReadMore}
                    handleLike={handleLike}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No articles yet</p>
                  <p className="text-gray-600 text-base">Be the first to share your story!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="text-center px-4">
            <div className="w-14 h-14 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 blur-lg animate-pulse"></div>
              <div className="relative w-14 h-14 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-700 font-medium text-sm">Loading stories...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;
