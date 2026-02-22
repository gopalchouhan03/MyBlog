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
    <div className="group card-modern overflow-visible h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-200">
        <img
          src={`https://picsum.photos/500/300?random=${index}`}
          alt="Blog Thumbnail"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Title */}
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {item?.title || "Untitled Post"}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 flex-1">
          {item?.desc || "No description available"}
        </p>

        {/* Author Info */}
        <Link
          to={`/profile/${item.author}`}
          className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity"
        >
          <img
            src={item.profileImage || `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${(index % 70) + 1}.jpg`}
            alt={item.author || "Author"}
            className="w-8 h-8 rounded-full object-cover border border-gray-300"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate">
              {item.author || "Anonymous"}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FaClock size={10} />
              <span className="truncate">{formatDate(item.date)}</span>
            </div>
          </div>
        </Link>

        {/* Footer: CTA & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
          <button
            onClick={() => handleReadMore(item?._id)}
            className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-xs sm:text-sm hover:text-blue-700 transition-colors"
          >
            Read More
            <FaArrowRight className="text-xs" />
          </button>
          <PostActions item={item} userId={userId} handleLike={handleLike} />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
