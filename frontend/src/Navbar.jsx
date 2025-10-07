import React, { useState, useEffect, useRef } from "react";
import { FaCog, FaSignOutAlt, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const API_BASE = import.meta.env.API_BASE;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // profile dropdown
  const [navOpen, setNavOpen] = useState(false); // mobile menu
  const [query, setQuery] = useState(""); // search query
  const [results, setResults] = useState([]); // search results
  const menuRef = useRef(null);

  const { isAuth, setIsAuth } = useAuth();
  const navigate = useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.trim() !== "") {
        try {
          const res = await axios.get(`${API_BASE}/api/search`, {
            params: { q: query }
          });
          setResults(res.data);
        } catch (err) {
          console.error("Search error:", err);
          setResults([]);
        }
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    alert("Log out");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-100 shadow-md z-50">
      <div className="container mx-auto px-6 flex items-center justify-between py-3">
        {/* Left: Logo */}
        <Link
          to={"/"}
          className="text-2xl font-bold text-gray-800 italic hover:text-blue-600"
        >
          MyBlog
        </Link>

        {/* Center: Search (only large screens) */}
        <div className="hidden lg:flex flex-col relative flex-grow justify-center mx-6 max-w-md w-full">
          <div className="flex">
            <input
              type="search"
              placeholder="Search"
              className="m-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="button"
              className="cursor-pointer m-1 px-4 py-2 border border-l-0 rounded-r bg-blue-600 text-white hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          {/* Dropdown Results */}
          {results.length > 0 && (
            <ul className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto z-50">
              {results.map((post) => (
                <li
                  key={post._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setQuery("");
                    setResults([]);
                    navigate(`/post/${post._id}`);
                  }}
                >
                  <strong>{post.title}</strong>
                  <p className="text-sm text-gray-500 truncate">{post.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: Links (desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to={"/"}
            className="text-gray-700 hover:text-blue-600 font-medium text-lg"
          >
            Home
          </Link>
          <Link
            to={"/createpost"}
            className="text-gray-700 hover:text-blue-600 font-medium text-lg"
          >
            Create Post
          </Link>

          {/* Profile / Login */}
          <div className="relative" ref={menuRef}>
            {isAuth ? (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-blue-500 transition cursor-pointer"
                />
              </button>
            ) : (
              <button
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-md hover:from-pink-600 hover:to-purple-700"
                onClick={handleLogin}
              >
                Login
              </button>
            )}

            {/* Dropdown */}
            {menuOpen && isAuth && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaUserCircle className="mr-2" /> Profile
                </Link>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </Link>
                <Link
                  to={"/settings"}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaCog className="mr-2" /> Settings
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden cursor-pointer">
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="text-2xl text-gray-700 focus:outline-none"
          >
            {navOpen ? <FaTimes className="cursor-pointer" /> : <FaBars className="cursor-pointer" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`lg:hidden bg-gray-100 shadow-md transform transition-transform duration-300 ease-in-out ${navOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <ul className="flex flex-col space-y-4 mt-3 px-6 pb-4">
          <li>
            <Link
              to={"/"}
              className="text-gray-700 hover:text-blue-600 font-medium text-lg"
              onClick={() => setNavOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/createpost"}
              className="text-gray-700 hover:text-blue-600 font-medium text-lg cursor-pointer"
              onClick={() => setNavOpen(false)}
            >
              Create Post
            </Link>
          </li>
          <li>
            {isAuth ? (
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 font-medium text-lg cursor-pointer"
                onClick={() => setNavOpen(false)}
              >
                Profile
              </Link>
            ) : (
              <button
                className="text-gray-700 hover:text-blue-600 font-medium text-lg text-left cursor-pointer"
                onClick={() => {
                  setNavOpen(false);
                  handleLogin();
                }}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
