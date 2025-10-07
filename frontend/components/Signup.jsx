import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
const API_BASE = import.meta.env.API_BASE;
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { setIsAuth, setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { username, fullName, email, password, confirmPassword } = form;

    if (!username || !fullName || !email || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
     const res =  await axios.post(`${API_BASE}/api/register`, {
        username,
        fullName,
        email,
        password,
      });

      alert("Signup successful 🎉");
      setUser({ ...res.data.user, token: res.data.token });
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-4">
      <div className=" mt-10 mb-10 w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8 sm:p-10 md:p-12">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
          Sign Up
        </h2>

        {/* Username */}
        <div className="mb-6">
          <label className="block text-base sm:text-lg font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Choose username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 text-base sm:text-lg border rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-base sm:text-lg font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter full name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 text-base sm:text-lg border rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-base sm:text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 text-base sm:text-lg border rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-base sm:text-lg font-medium mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 text-base sm:text-lg border rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <button
            type="button"
            className="absolute right-4 top-11 sm:top-12 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="cursor-pointer" />
            ) : (
              <Eye className="cursor-pointer" />
            )}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="mb-8 relative">
          <label className="block text-base sm:text-lg font-medium mb-2">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 text-base sm:text-lg border rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <button
            type="button"
            className="absolute right-4 top-11 sm:top-12 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="cursor-pointer" />
            ) : (
              <Eye className="cursor-pointer" />
            )}
          </button>
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full py-3 sm:py-4 text-lg sm:text-xl font-semibold bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition cursor-pointer"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-600 text-base sm:text-lg">
          Already have an account?{" "}
          <span
            className="text-pink-600 font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
