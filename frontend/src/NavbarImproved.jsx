import React, { useState, useEffect, useRef } from "react";
import { FaCog, FaSignOutAlt, FaUserCircle, FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";
import { showSuccess, showError } from "../utils/toast";
import axios from "axios";

const API_BASE_URL = 'https://d2w8d5sgt2ne9t.cloudfront.net/api';

const NavbarImproved = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const menuRef = useRef(null);
  
  const { isAuth, setIsAuth, user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
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

  // Search with debounce
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

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`);
      logout();
      showSuccess('Logged out successfully');
      navigate("/login");
    } catch (err) {
      console.error('Logout error:', err);
      logout(); // Logout anyway
      navigate("/login");
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b shadow-md z-50 transition-colors duration-300`}>
      <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between py-3 lg:py-4">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold italic hover:text-blue-600 transition ${isDark ? 'text-white' : 'text-gray-900'}`}
        >
          MyBlog
        </Link>

        {/* Desktop Search */}
        <div className="hidden lg:flex flex-col relative flex-grow mx-6 max-w-md">
          <input
            type="search"
            placeholder="Search posts..."
            className={`px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {results.length > 0 && (
            <div className={`absolute top-full mt-2 w-full rounded-lg shadow-lg max-h-64 overflow-y-auto ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              {results.map((post) => (
                <Link
                  key={post._id}
                  to={`/readmore/${post._id}`}
                  onClick={() => { setQuery(""); setResults([]); }}
                  className={`block px-4 py-2 hover:bg-blue-600 hover:text-white transition ${isDark ? 'text-gray-300' : 'text-gray-900'}`}
                >
                  {post.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition hover:bg-opacity-20 ${
              isDark
                ? 'text-yellow-400 hover:bg-yellow-500'
                : 'text-gray-900 hover:bg-gray-200'
            }`}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {isAuth ? (
            <>
              {/* Create Post Button */}
              <Link
                to="/create"
                className="hidden sm:inline px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
              >
                Write
              </Link>

              {/* Profile Menu */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isDark
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  <FaUserCircle size={24} />
                  <span className="hidden sm:inline text-sm font-medium">{user?.username}</span>
                </button>

                {menuOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <Link
                      to={`/profile/${user?.username}`}
                      className={`block px-4 py-3 hover:bg-blue-600 hover:text-white rounded-t-lg transition ${
                        isDark ? 'text-gray-300' : 'text-gray-900'
                      }`}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className={`block px-4 py-3 hover:bg-blue-600 hover:text-white transition ${
                        isDark ? 'text-gray-300' : 'text-gray-900'
                      }`}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-3 hover:bg-red-600 hover:text-white rounded-b-lg transition flex items-center gap-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-900'
                      }`}
                    >
                      <FaSignOutAlt size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="lg:hidden"
          >
            {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {navOpen && (
        <div className={`border-t ${isDark ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} p-4 lg:hidden`}>
          <input
            type="search"
            placeholder="Search posts..."
            className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {!isAuth && (
            <Link
              to="/create"
              className="block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-center"
            >
              Write Post
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavbarImproved;
