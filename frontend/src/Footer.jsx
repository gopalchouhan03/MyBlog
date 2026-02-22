import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300 pt-16 pb-8 mt-20">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-16 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-blue-500/20 p-8 sm:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Never miss an update</h3>
              <p className="text-gray-400">Subscribe to get the latest articles delivered to your inbox</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:flex-0 px-4 py-3 bg-white/10 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-r-lg hover:from-blue-700 hover:to-purple-700 font-semibold transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="text-xl font-bold gradient-text">MyBlog</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Empowering writers and readers to share knowledge, stories, and ideas through beautifully designed digital publishing.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <FaArrowRight size={12} /> Home
                </Link>
              </li>
              <li>
                <Link to="/createpost" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <FaArrowRight size={12} /> Write Article
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <FaArrowRight size={12} /> Featured
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <FaArrowRight size={12} /> Browse Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <FaArrowRight size={12} /> About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <FaArrowRight size={12} /> Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <FaArrowRight size={12} /> Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <FaArrowRight size={12} /> Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <FaArrowRight size={12} /> Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <FaArrowRight size={12} /> Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <FaArrowRight size={12} /> Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  <FaArrowRight size={12} /> Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {currentYear} <span className="gradient-text font-semibold">MyBlog</span>. All rights reserved. Built with passion ❤️
          </p>
          <p className="text-gray-500 text-sm">
            Made with <span className="text-red-500">♥</span> by the MyBlog Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
