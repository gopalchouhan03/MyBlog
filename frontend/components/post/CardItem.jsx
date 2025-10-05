import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import PostActions from "./PostActions";

const CardItem = ({ item, index, userId, handleReadMore, handleLike }) => {
  if (!item) return null;
  
  return (
    <div className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl relative">
      {/* Thumbnail */}
      <div className="relative h-48 sm:h-56 md:h-64 w-full rounded-t-3xl overflow-hidden">
        <img
          src={`https://picsum.photos/500/300?random=${index}`}
          alt="Blog Thumbnail"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-3xl"></div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
          {item?.title || "Untitled"}
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3">{item?.desc || ""}</p>

        {/* Author + Date */}
        <Link
          to={`/profile/${item.author}`} // Navigate to real user profile
          className="flex items-center gap-3 mb-4"
        >
          <img
            src={item.profileImage || `https://randomuser.me/api/portraits/men/${index + 10}.jpg`}
            alt={item.authorName || "Unknown"}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">
              {item.author || "Unknown"}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm">{item.date || ""}</p>
          </div>
        </Link>


        {/* Read More */}
        <button
          className=" cursor-pointer inline-flex items-center text-pink-600 font-semibold text-sm md:text-base hover:underline"
          onClick={() => handleReadMore(item?._id)}
        >
          Read More <FaArrowRight className="ml-1 text-sm" />
        </button>
      </div>

      {/* Post Actions */}
      <PostActions item={item} userId={userId} handleLike={handleLike} />
    </div>
  );
};

export default CardItem;
