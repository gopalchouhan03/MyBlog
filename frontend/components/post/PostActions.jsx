import { FaHeart, FaRegComment, FaShareAlt, FaFacebookF, FaTwitter, FaWhatsapp, FaLink } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const API_BASE = import.meta.env.API_BASE;

const PostActions = ({ item, userId, handleLike }) => {
    const [likes, setLikes] = useState(item?.likes?.length || 0);
    const [liked, setLiked] = useState(userId ? item?.likes?.includes(userId) : false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [commentsCount, setCommentsCount] = useState(item?.commentsCount || 0);
    const [showComments, setShowComments] = useState(false);
    const [shares, setShares] = useState(item?.shares || 0);
    const [showShare, setShowShare] = useState(false);

    const commentRef = useRef(null);
    const shareRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (commentRef.current && !commentRef.current.contains(event.target)) setShowComments(false);
            if (shareRef.current && !shareRef.current.contains(event.target)) setShowShare(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => { fetchComments(); }, []);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/posts/${item._id}/comments`);
            if (res.data.success) {
                setComments(res.data.comments);
                setCommentsCount(res.data.commentsCount);
            }
        } catch (err) { console.error(err); }
    };

    const handleAddComment = async () => {
        if (!commentText.trim()) return;
        try {
            const res = await axios.post(`${API_BASE}/api/posts/${item._id}/comment`, { userId, text: commentText });
            console.log(res.data)
            if (res.data.success) {
                setComments(res.data.comments);
                setCommentsCount(res.data.commentsCount);
                setCommentText("");
            }
        } catch (err) { console.error(err); }
    };

    const handleShare = async (platform) => {
        try {
            const postUrl = window.location.origin + `/post/${item._id}`;

            // Increment share count in DB
            const res = await axios.post(`${API_BASE}/api/posts/${item._id}/share`);
            if (res.data.success) setShares(res.data.shares);

            // Open respective platform
            switch (platform) {
                case "facebook": window.open(`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`, "_blank"); break;
                case "twitter": window.open(`https://twitter.com/intent/tweet?url=${postUrl}`, "_blank"); break;
                case "whatsapp": window.open(`https://api.whatsapp.com/send?text=${postUrl}`, "_blank"); break;
                case "copy": navigator.clipboard.writeText(postUrl); alert("Link copied!"); break;
                default: break;
            }

            setShowShare(false);
        } catch (err) {
            console.error("Error sharing post:", err);
        }
    };
    return (
        <div className="border-t bg-white relative">

            {/* Action Buttons */}
            <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
                {/* Like */}
                <button
                    onClick={() => userId ? handleLike(item._id, setLikes, setLiked) : alert("Please login")}
                    className={` cursor-pointer flex items-center gap-1 sm:gap-2 text-lg sm:text-xl md:text-2xl transition-transform duration-200 ${liked ? "text-red-500 scale-110" : "text-gray-600 hover:text-red-400"}`}
                >
                    <FaHeart />
                    <span className={`text-sm sm:text-base md:text-lg font-semibold ${liked ? "text-red-500" : "text-gray-800"}`}>{likes}</span>
                </button>

                {/* Comment */}
                <button
                    onClick={() => setShowComments(!showComments)}
                    className=" cursor-pointer flex items-center gap-1 sm:gap-2 text-lg sm:text-xl md:text-2xl text-gray-600 hover:text-blue-500 transition-transform duration-200"
                >
                    <FaRegComment />
                    <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">{commentsCount}</span>
                </button>

                {/* Share */}
                {/* Share */}
                <div className="relative" ref={shareRef}>
                    <button
                        onClick={() => setShowShare(!showShare)}
                        className=" cursor-pointer flex items-center gap-1 sm:gap-2 text-lg sm:text-xl md:text-2xl text-gray-600 hover:text-green-500 transition-transform duration-200"
                    >
                        <FaShareAlt />
                        <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">{shares}</span>

                    </button>

                    {/* Share Platforms Dropdown */}
                    <div className={`absolute right-0 mt-1 px-2 py-2 bg-white border rounded shadow-lg flex flex-col gap-2 w-32 z-20 transition-all duration-300 overflow-hidden ${showShare ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                        <button className=" cursor-pointer flex items-center gap-2 text-sm hover:text-blue-600" onClick={() => handleShare("facebook")}><FaFacebookF /> Facebook</button>
                        <button className=" cursor-pointer flex items-center gap-2 text-sm hover:text-blue-400" onClick={() => handleShare("twitter")}><FaTwitter /> X </button>
                        <button className=" cursor-pointer flex items-center gap-2 text-sm hover:text-green-500" onClick={() => handleShare("whatsapp")}><FaWhatsapp /> WhatsApp</button>
                        <button className=" cursor-pointer flex items-center gap-2 text-sm hover:text-gray-700" onClick={() => handleShare("copy")}><FaLink /> Copy Link</button>
                    </div>
                </div>

            </div>

            {/* Comments Dropdown */}
            <div
                ref={commentRef}
                className={`absolute left-0 top-full z-10 mt-1 w-full max-w-full sm:max-w-md lg:max-w-lg border bg-gray-50 rounded-b-2xl shadow-lg transition-all duration-300 overflow-hidden ${showComments ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
            >
                {/* Comments List */}
                <div className="max-h-56 overflow-y-auto px-3 py-2">
                    {comments.length > 0 ? (
                        comments.map((c, idx) => (
                            <p key={idx} className="text-gray-700 text-xs sm:text-sm mb-1">
                                <span className="font-semibold">{c.user?.username || "Anonymous"}</span>: {c.text}
                            </p>
                        ))
                    ) : (
                        <p className="text-gray-500 text-xs sm:text-sm">No comments yet</p>
                    )}
                </div>

                {/* Add Comment Input (Sticky at Bottom) */}
                <div className="px-3 py-2 border-t bg-gray-50 sticky bottom-0 flex gap-2">
                    <input
                        type="text"
                        className="flex-1 border rounded px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                    />
                    <button
                        onClick={handleAddComment}
                        className="px-2 sm:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm transition-colors"
                    >
                        Post
                    </button>
                </div>
            </div>


        </div>
    );
};

export default PostActions;
