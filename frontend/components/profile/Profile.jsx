import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import PostActions from "../post/PostActions";
const API_BASE = import.meta.env.API_BASE;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadUser = async () => {
      const { userData, postData } = await fetchUser();
      if (userData) setProfile(userData);
      if (postData) setPosts(postData);
    };
    loadUser();
  }, []);


  const fetchUser = async () => {
    if (!user?.id) {
      console.log("User not logged in");
      return;
    }

    const token = user?.token || localStorage.getItem("token");

    try {
      const res = await axios.get(`${API_BASE}/api/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = res.data.data.user;
      const postData = res.data.data.posts;
      return { userData, postData };
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
    }
  };

  if (!profile) return <p className="mt-20">Loading...</p>;
  return (
    <div className=" mt-10 max-w-5xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <div className="relative">
          <img
            src={`${profile.profileImage}` || "https://www.w3schools.com/howto/img_avatar.png"}
            alt="User"
            onError={(e) => {
              e.target.onerror = null; // prevents infinite loop
              e.target.src = "https://www.w3schools.com/howto/img_avatar.png"; // fallback image
            }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-200 shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              {profile.username}
              {/* Blue tick */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.25 12c0-5.65-4.6-10.25-10.25-10.25S1.75 6.35 1.75 12 6.35 22.25 12 22.25 22.25 17.65 22.25 12zm-11.97 5.18l-4.69-4.7 1.41-1.42 3.28 3.29 7.07-7.08 1.41 1.42-8.48 8.49z" />
              </svg>
            </h2>

            {/* Edit / Follow / Message Buttons */}
            <div className="flex gap-2">
              <Link
                to={"/editprofile"}
                className="px-4 py-1 text-sm md:text-base font-semibold rounded-full border shadow-sm hover:shadow-md transition bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-4 text-gray-800 font-medium">
            <p>
              <span className="font-bold">{profile.followers}</span>
            </p>
            <p>
              <span className="font-bold">{profile.followings}</span>
            </p>
          </div>

          {/* Bio */}
          <div className="mt-4 text-gray-700">
            <p className="font-semibold text-gray-900">{profile.fullname}</p>
            <p>{profile.bio}</p>
            <a
              href="https://example.com"
              className="text-blue-600 hover:underline"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t mt-8 mb-6"></div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {posts.length > 0 ? (
          posts.map((item, idx) => (
            <div
              key={item?._id || idx}
              className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl relative"
            >
              {/* Thumbnail */}
              <div className="relative h-48 sm:h-56 md:h-64 w-full rounded-t-3xl overflow-hidden">
                <img
                  src={item?.thumbnail || `https://picsum.photos/500/300?random=${idx}`}
                  alt="Blog Thumbnail"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-3xl"></div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                  {item?.title || "Untitled"}
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3">
                  {item?.desc || "No description available."}
                </p>

                {/* Author + Date */}
                <Link
                  to={`/userprofile/${item?.author?._id || ""}`}
                  className="flex items-center gap-3 mb-4"
                >
                  <img
                    src={
                      item?.author?.profileImage ||
                      "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    alt={item?.author?.username || "Unknown"}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                      {item?.author?.username || "Unknown"}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm">
                      {new Date(item?.createdAt).toLocaleDateString() || ""}
                    </p>
                  </div>
                </Link>

                {/* Read More */}
                <button
                  className="cursor-pointer inline-flex items-center text-pink-600 font-semibold text-sm md:text-base hover:underline"
                  onClick={() => handleReadMore(item?._id)}
                >
                  Read More <FaArrowRight className="ml-1 text-sm" />
                </button>
              </div>

              {/* Post Actions */}
              <PostActions
                item={item}
                userId={user?.id}
                handleLike={async (postId, setLikes, setLiked) => {
                  try {
                    const res = await axios.post(`/api/posts/${postId}/like`, { userId: user.id });
                    if (res.data.success) {
                      setLikes(res.data.likesCount);
                      setLiked(res.data.liked);
                    }
                  } catch (err) {
                    console.error("Error liking post:", err);
                  }
                }}
              />

            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-10">
            No posts found.
          </p>
        )}
      </div>

    </div>
  );
};

export default Profile;
