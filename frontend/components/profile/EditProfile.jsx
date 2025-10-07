import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE = import.meta.env.API_BASE;

const EditProfile = ({ userId }) => {
  const [form, setForm] = useState({ fullName: "", bio: "", profileImage: "" });

  useEffect(() => {
    // Fetch existing user data
    axios.get(`${API_BASE}/api/users/${userId}`)
      .then(res => setForm(res.data.data))
      .catch(err => console.error(err));
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_BASE}/api/users/${userId}/edit`, form);
      alert("Profile updated ✅");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        className="w-full p-3 mb-4 border rounded"
      />
      <textarea
        name="bio"
        placeholder="Write your bio..."
        value={form.bio}
        onChange={handleChange}
        className="w-full p-3 mb-4 border rounded"
      />
      <input
        type="text"
        name="profileImage"
        placeholder="Profile Image URL"
        value={form.profileImage}
        onChange={handleChange}
        className="w-full p-3 mb-4 border rounded"
      />
      <button
        onClick={handleSave}
        className="w-full py-3 bg-pink-600 text-white rounded hover:bg-pink-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
