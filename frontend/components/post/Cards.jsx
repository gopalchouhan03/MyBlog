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
        <div className="min-h-screen pt-20">
          {/* Header Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="text-center animate-slideInDown">
              <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-3">
                Discover Stories
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore inspiring articles, insightful perspectives, and engaging content from passionate writers.
              </p>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {post && post.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
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
                  <p className="text-2xl font-bold text-gray-700 mb-3">No articles yet</p>
                  <p className="text-gray-500 text-lg">Be the first to share your story!</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Spacing */}
          <div className="h-12"></div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-25 blur-xl animate-pulse"></div>
              <div className="relative w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 font-semibold">Loading amazing stories...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;
