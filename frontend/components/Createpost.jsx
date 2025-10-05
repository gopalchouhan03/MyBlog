import React, { useState } from "react";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    try {
      const token = user?.token || localStorage.getItem("token");

      const res = await axios.post(
        "/api/createpost",
        { title, desc },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("✅ Post created successfully!");
        navigate("/"); // navigate to homepage
        setTitle("");
        setDesc("");
      } else {
        alert("❌ Failed to create post!");
      }
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
      alert("⚠️ Something went wrong while creating the post.");
    }
  };

  const handleCreatePostSubmit = async (e) => {
    e.preventDefault(); // prevents page reload
    await handleCreatePost();
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center p-22">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-blue-600">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create a New Post
        </h1>

        <form className="space-y-5" onSubmit={handleCreatePostSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            required
          />

          <label htmlFor="post-desc" className="block text-gray-700 font-medium mb-2">
            Post Description
          </label>
          <textarea
            id="post-desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Write your post here..."
            className="w-full px-5 py-3 border rounded-xl h-40 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
