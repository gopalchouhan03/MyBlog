import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { setIsAuth, setUser } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await axios.post("/api/login", {
        username,
        password,
      });

      if (res.data.success) {
        setUser({ ...res.data.user, token: res.data.token }); // Save user + token
        setIsAuth(true);

        setIsAuth(true);
        setUser(res.data.user);
        navigate("/");
      } else {
        alert(res.data.message || "Try again ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-[420px] bg-white shadow-2xl rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Login
        </h2>

        {/* Username */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 text-lg border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-8 relative">
          <label className="block text-lg font-medium mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 text-lg border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <button
            type="button"
            className="absolute right-4 top-12 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="cursor-pointer" /> : <Eye className="cursor-pointer" />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-4 text-xl font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition cursor-pointer"
        >
          Login
        </button>

        <p className="text-center mt-6 text-gray-600 text-lg">
          Don’t have an account?{" "}
          <span
            className="text-indigo-600 font-semibold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
