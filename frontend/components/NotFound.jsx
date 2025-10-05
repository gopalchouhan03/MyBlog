import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-400">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center text-white p-8 rounded-2xl shadow-2xl bg-black/40 backdrop-blur-lg"
      >
        <h1 className="text-9xl font-extrabold">404</h1>
        <p className="text-2xl mt-4">Oops! Page Not Found</p>
        <p className="mt-2 text-gray-200">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl shadow-lg hover:bg-purple-100 transition"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
