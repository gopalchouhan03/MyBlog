import { FaArrowRight, FaClock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import PostActions from "./PostActions";

const CardItem = ({ item, index, userId, handleReadMore, handleLike }) => {
  if (!item) return null;
  
  // Format date nicely
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  };

  return (
    <div className="group card-modern overflow-hidden h-full flex flex-col animate-fadeInUp">
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
        <img
          src={`https://picsum.photos/500/300?random=${index}`}
          alt="Blog Thumbnail"
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:gradient-text transition-all duration-300">
          {item?.title || "Untitled Post"}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {item?.desc || "No description available"}
        </p>

        {/* Author Info */}
        <Link
          to={`/profile/${item.author}`}
          className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity"
        >
          <img
            src={item.profileImage || `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${(index % 70) + 1}.jpg`}
            alt={item.author || "Author"}
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 shadow-sm"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-800 text-sm">
              {item.author || "Anonymous"}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FaClock size={11} />
              {formatDate(item.date)}
            </div>
          </div>
        </Link>

        {/* Footer: CTA & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={() => handleReadMore(item?._id)}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 hover:gap-3 transition-all duration-300 group/btn"
          >
            Read More
            <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
          </button>
          <PostActions item={item} userId={userId} handleLike={handleLike} />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
