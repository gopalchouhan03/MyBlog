export const PostCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
      <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export const PostPageSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6"></div>
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-3/4"></div>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-1/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      <div className="flex items-center gap-6 mb-8">
        <div className="h-32 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-3 w-1/3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export const CommentSkeleton = () => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4 animate-pulse">
      <div className="flex gap-3">
        <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full flex-shrink-0"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-1/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
};
