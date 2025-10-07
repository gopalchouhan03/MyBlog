import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
const API_BASE = import.meta.env.API_BASE;

const ProfilePage = () => {
  const { userId } = useParams(); // profile being viewed
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useAuth(); // logged-in user

  // Fetch profile user info
  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        if (res.data.success) {
          setProfileUser(res.data.user);
          setIsFollowing(res.data.user.followers?.includes(user.id));
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchProfileUser();
  }, [userId, user.id]);

  // Fetch posts
  useEffect(() => {
    if (!profileUser?._id) return;

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/posts/${profileUser._id}`);
        if (res.data.success) setPosts(res.data.posts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [profileUser]);
  
  // Follow / Unfollow handler
 const handleFollowToggle = async () => {
  try {
    // Use profileUser._id in URL, and logged-in user id in body
    const url = `${API_BASE}/api/users/${profileUser._id}/${isFollowing ? "unfollow" : "follow"}`;
    const res = await axios.put(url, { userId: user.id });

    if (res.data.success) {
      setIsFollowing(!isFollowing);

      // Update profileUser's followers array locally
      setProfileUser(prev => ({
        ...prev,
        followers: isFollowing
          ? prev.followers.filter(f => f.toString() !== user.id)
          : [...(prev.followers || []), user.id],
      }));
    }
  } catch (err) {
    console.error("Error updating follow status:", err);
  }
};


  if (loadingUser) return <p>Loading user...</p>;
  if (!profileUser) return <p>User not found</p>;

  return (
    <div className="mt-10 max-w-5xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={profileUser.profileImage || "https://i.pravatar.cc/150?u=default"}
          alt={profileUser.fullName || "Unknown"}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-200 shadow-lg"
        />

        <div className="flex-1 w-full md:w-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{profileUser.fullName || "Unknown"}</h2>

            {/* Follow / Following button */}
            {user.id !== profileUser._id && (
              <button
                onClick={handleFollowToggle}
                className={`px-5 py-2 text-sm md:text-base font-semibold rounded-full border shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                  isFollowing
                    ? "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent hover:from-blue-600 hover:to-indigo-600"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-4 text-gray-700 font-medium text-sm md:text-base">
            <p>
              <span className="font-bold text-gray-900">{posts.length}</span> Posts
            </p>
            <p>
              <span className="font-bold text-gray-900">{profileUser.followers?.length || 0}</span> Followers
            </p>
            <p>
              <span className="font-bold text-gray-900">{profileUser.following?.length || 0}</span> Following
            </p>
          </div>

          {/* Bio */}
          <p className="text-gray-600 mt-1">{profileUser.bio || "No bio available"}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t mt-8 mb-6"></div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {loadingPosts ? (
          <p>Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((item, idx) => (
            <div key={item?._id || idx} className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl relative">
              <div className="relative h-48 sm:h-56 md:h-64 w-full rounded-t-3xl overflow-hidden">
                <img
                  src={item?.thumbnail || `https://picsum.photos/500/300?random=${idx}`}
                  alt="Blog Thumbnail"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-3xl"></div>
              </div>

              <div className="p-4 sm:p-5 md:p-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                  {item?.title || "Untitled"}
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3">
                  {item?.desc || "No description available."}
                </p>

                <Link to={`/profile/${item?.author?._id || ""}`} className="flex items-center gap-3 mb-4">
                  <img
                    src={item?.author?.profileImage || "https://www.w3schools.com/howto/img_avatar.png"}
                    alt={item?.author?.username || "Unknown"}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base">{item?.author?.username || "Unknown"}</h3>
                    <p className="text-gray-500 text-xs md:text-sm">{new Date(item?.createdAt).toLocaleDateString() || ""}</p>
                  </div>
                </Link>

                <button className="cursor-pointer inline-flex items-center text-pink-600 font-semibold text-sm md:text-base hover:underline">
                  Read More <FaArrowRight className="ml-1 text-sm" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-10">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
