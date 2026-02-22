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
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-sm">
              M
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 hidden sm:inline">MyBlog</span>
          </Link>

          {/* Center: Search (desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 lg:mx-8">
            <div className="flex items-center w-full relative">
              <FaSearch className="absolute left-3 text-gray-400 text-sm" />
              <input
                type="search"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Search Dropdown */}
            {results.length > 0 && (
              <ul className="absolute top-12 left-0 right-0 bg-white shadow-md rounded-lg max-h-60 overflow-y-auto z-50 border border-gray-200">
                {results.map((post) => (
                  <li
                    key={post._id}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors"
                    onClick={() => {
                      setQuery("");
                      setResults([]);
                      navigate(`/post/${post._id}`);
                    }}
                  >
                    <p className="font-semibold text-gray-800 text-sm">{post.title}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{post.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: Navigation & CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm">
              Home
            </Link>
            <Link to="/createpost" className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm">
              Write
            </Link>

            {/* Profile or Login */}
            <div className="relative" ref={menuRef}>
              {isAuth ? (
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user?.profileImage || `https://randomuser.me/api/portraits/men/32.jpg`}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user?.username || "User"}</span>
                </button>
              ) : (
                <button
                  className="btn-gradient text-sm px-4 py-2"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
              )}

              {/* Dropdown Menu */}
              {menuOpen && isAuth && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 border border-gray-200 z-50">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUserCircle className="text-blue-600" /> My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaCog className="text-gray-600" /> Settings
                  </Link>
                  <hr className="my-1.5 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left text-sm"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Search Button */}
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FaSearch className="text-gray-700 text-lg" />
            </button>
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {navOpen ? <FaTimes className="text-gray-700 text-xl" /> : <FaBars className="text-gray-700 text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {navOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200">
            {/* Mobile Search */}
            <div className="py-4 px-0">
              <div className="flex items-center relative">
                <FaSearch className="absolute left-4 text-gray-400 text-sm" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full px-4 pl-10 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Link
                to="/"
                className="text-gray-700 font-medium hover:text-blue-600 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                onClick={() => setNavOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/createpost"
                className="text-gray-700 font-medium hover:text-blue-600 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                onClick={() => setNavOpen(false)}
              >
                Write Article
              </Link>
              {isAuth && (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-700 font-medium hover:text-blue-600 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    onClick={() => setNavOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="text-gray-700 font-medium hover:text-blue-600 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    onClick={() => setNavOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setNavOpen(false);
                    }}
                    className="text-red-600 font-medium hover:bg-red-50 px-4 py-2.5 rounded-lg text-left w-full text-sm transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
              {!isAuth && (
                <button
                  className="btn-gradient w-full py-2 text-sm mt-2"
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
