import React, { useState, useEffect, useRef } from "react";
import { FaCog, FaSignOutAlt, FaUserCircle, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const API_BASE_URL = 'https://myblog-backend-t9rr.onrender.com/api';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const menuRef = useRef(null);

  const { isAuth, setIsAuth, user } = useAuth();
  const navigate = useNavigate();

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
          const res = await axios.get(`${API_BASE_URL}/search`, {
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
    navigate("/login");
    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setNavOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/80 shadow-lg z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all">
              M
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">MyBlog</span>
          </Link>

          {/* Center: Search (desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
            <div className="flex items-center w-full">
              <FaSearch className="absolute left-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search articles, stories..."
                className="w-full pl-12 pr-4 py-2.5 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Search Dropdown */}
            {results.length > 0 && (
              <ul className="absolute top-14 left-0 right-0 bg-white shadow-xl rounded-xl max-h-64 overflow-y-auto z-50 border border-gray-100">
                {results.map((post) => (
                  <li
                    key={post._id}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                    onClick={() => {
                      setQuery("");
                      setResults([]);
                      navigate(`/post/${post._id}`);
                    }}
                  >
                    <p className="font-semibold text-gray-800 text-sm">{post.title}</p>
                    <p className="text-xs text-gray-500 truncate mt-1">{post.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: Navigation & CTA */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-gray-700 font-medium hover:gradient-text transition-all text-sm">
              Home
            </Link>
            <Link to="/createpost" className="text-gray-700 font-medium hover:gradient-text transition-all text-sm">
              Write
            </Link>

            {/* Profile or Login */}
            <div className="relative" ref={menuRef}>
              {isAuth ? (
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <img
                    src={user?.profileImage || `https://randomuser.me/api/portraits/men/32.jpg`}
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 shadow-md"
                  />
                  <span className="text-sm font-semibold text-gray-700 hidden sm:inline">{user?.username || "User"}</span>
                </button>
              ) : (
                <button
                  className="btn-gradient text-sm px-5 py-2.5"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
              )}

              {/* Dropdown Menu */}
              {menuOpen && isAuth && (
                <div className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-xl py-2 border border-gray-100 animate-fadeInUp">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUserCircle className="text-blue-600" /> My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaCog className="text-gray-600" /> Settings
                  </Link>
                  <hr className="my-2 border-gray-100" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="lg:hidden text-2xl text-gray-700 hover:text-blue-600 transition-colors"
          >
            {navOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {navOpen && (
          <div className="lg:hidden pb-4 animate-slideInDown">
            {/* Mobile Search */}
            <div className="mb-4 flex items-center">
              <FaSearch className="absolute left-6 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full ml-6 pl-8 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-gray-700 font-medium hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setNavOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/createpost"
                className="text-gray-700 font-medium hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50"
                onClick={() => setNavOpen(false)}
              >
                Write Article
              </Link>
              {isAuth && (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-700 font-medium hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50"
                    onClick={() => setNavOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="text-gray-700 font-medium hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50"
                    onClick={() => setNavOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setNavOpen(false);
                    }}
                    className="text-red-600 font-medium hover:bg-red-50 px-4 py-2 rounded-lg text-left w-full"
                  >
                    Logout
                  </button>
                </>
              )}
              {!isAuth && (
                <button
                  className="btn-gradient w-full py-2.5 text-sm"
                  onClick={() => {
                    handleLogin();
                    setNavOpen(false);
                  }}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
