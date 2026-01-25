import { Link } from 'react-router-dom';
import { BookOpen, Search, Heart } from 'lucide-react';

export const EmptyPosts = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No posts yet</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Be the first to create a blog post</p>
      <Link 
        to="/create" 
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
      >
        Create First Post
      </Link>
    </div>
  );
};

export const EmptySearch = ({ query }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <Search className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
      <p className="text-gray-600 dark:text-gray-400">
        No posts found matching "<span className="font-semibold">{query}</span>"
      </p>
    </div>
  );
};

export const EmptyComments = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Heart className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-3" />
      <p className="text-gray-600 dark:text-gray-400">No comments yet. Be the first to comment!</p>
    </div>
  );
};

export const EmptyBookmarks = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No bookmarks</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Save posts to read them later</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
      >
        Explore Posts
      </Link>
    </div>
  );
};

export const EmptyUserProfile = ({ username }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{username} hasn't posted yet</h3>
      <p className="text-gray-600 dark:text-gray-400">Check back later for updates</p>
    </div>
  );
};
