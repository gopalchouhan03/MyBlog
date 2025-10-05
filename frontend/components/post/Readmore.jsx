import { FaHeart, FaRegComment, FaShareAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import PostActions from "./PostActions";

const Readmore = () => {
    const location = useLocation();
    const { fullPost , user } = location.state || {};
    const userId = user._id;
    if (!fullPost) return <p className="text-center mt-20 text-gray-500">Post not found!</p>;
    
     const navigate = useNavigate();
    return (
        <div className="w-4/5 max-w-4xl mx-auto mt-20 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition-shadow duration-300">

            {/* Author Profile */}
            <div className="flex items-center px-6 py-5 bg-gray-50 cursor-pointer" onClick={() =>  navigate(`/profile/:${userId}`)}>
                <img
                    src={`https://picsum.photos/500/300?random=${Date.now()}`}
                    alt="Author"
                    className="w-14 h-14 rounded-full border-2 border-blue-400 mr-4"
                />
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">{fullPost.author}</h3>
                    <p className="text-md text-gray-500 mt-1">{fullPost.date}</p>
                </div>
            </div>

            {/* Blog Content */}
            <div className="px-8 py-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{fullPost.title}</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{fullPost.desc}</p>
            </div>

            {/* Action Icons with counts */}
            <PostActions  userId={userId}/>
        </div>
    );
};

export default Readmore;
