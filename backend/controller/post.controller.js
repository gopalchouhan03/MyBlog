const { Post, Comment } = require("../model/postSchema");

const postList = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username fullName profileImage") // only fetch selected fields
      .sort({ createdAt: -1 }); // latest first

    const formattedPost = posts.map(post => ({
      ...post._doc,
      author: post.author?.username || "Unknown",
      fullName: post.author?.fullName || "",
      profileImage: post.author?.profileImage || "",
      date: post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-GB") : new Date().toLocaleDateString("en-GB"),
    }));

    res.status(200).json({
      success: true,
      data: formattedPost,
    });
  } catch (error) {
    console.error("PostList Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};



const createPost = async (req, res) => {
  try {
    const { title, desc } = req.body;

    // Validate input
    if (!title || !desc) {
      return res.status(400).json({ success: false, message: "Title and description are required" });
    }

    // Make sure authMiddleware sets req.user
    if (!req.user?.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Create post
    const post = new Post({
      title,
      desc,
      author: req.user.id, // assign author from JWT
    });

    const savedPost = await post.save();

    res.status(201).json({ success: true, message: "Post Created", data: savedPost });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const readMorePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate(
      "author",
      "username fullName profileImage"
    ); // populate author details

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const formattedPost = {
      ...post._doc,
      author: post.author?.username || "Unknown",
      fullName: post.author?.fullName || "",
      profileImage: post.author?.profileImage || "",
      date: post.date ? new Date(post.date).toLocaleDateString("en-IN", {
        weekday: "short", // Mon
        year: "numeric", // 2025
        month: "short",  // Jan
        day: "numeric",  // 16
      }) : new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    res.status(200).json({ success: true, data: formattedPost });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const likes = async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    // Check if user already liked (convert to string for comparison)
    const userIdStr = userId.toString();
    const index = post.likes.findIndex(id => id.toString() === userIdStr);
    
    if (index === -1) {
      // not liked yet → add like
      post.likes.push(userId);
    } else {
      // already liked → remove like (unlike)
      post.likes.splice(index, 1);
    }

    await post.save();

    res.status(200).json({ 
      success: true,
      likes: post.likes.length, 
      liked: index === -1 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Add comment
const addComment = async (req, res) => {
  const { postId } = req.params;
  const { userId, text } = req.body;

  if (!userId || !text) {
    return res.status(400).json({ message: "Missing userId or text" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = new Comment({
      post: postId,
      user: userId,
      text,
    });

    await comment.save();

    // ✅ fetch updated comments with user info
    const updatedComments = await Comment.find({ post: postId })
      .populate("user", "username email")  // only return username/email from User
      .sort({ date: -1 }); // latest first

    res.status(200).json({
      success: true,
      comment: await comment.populate("user", "username email"),
      comments: updatedComments,
      commentsCount: updatedComments.length,
    });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// controllers/postController.js
const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId })
      .populate("user", "username email")
      .sort({ date: -1 });

    res.status(200).json({ success: true, comments, commentsCount: comments.length });
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const incrementShare = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    post.shares += 1;  // increment share count
    await post.save();

    res.status(200).json({ success: true, shares: post.shares });
  } catch (err) {
    console.error("Error incrementing share:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const searchPosts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res.json([]);
    }

    // Case-insensitive partial match
    const results = await Post.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ],
    }).limit(10); // Limit results

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ===================== UPDATE POST =====================
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, content, tags, coverImage } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Check authorization
    if (post.author.toString() !== req.user?.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Update fields
    if (title) post.title = title;
    if (desc) post.desc = desc;
    if (content) post.content = content;
    if (tags) post.tags = tags;
    if (coverImage) post.coverImage = coverImage;
    post.updatedAt = new Date();

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post
    });
  } catch (err) {
    console.error("Update post error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ===================== DELETE POST =====================
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Check authorization
    if (post.author.toString() !== req.user?.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Delete associated comments
    await Comment.deleteMany({ post: id });

    // Delete post
    await Post.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully"
    });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ===================== ADD BOOKMARK =====================
const bookmarkPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const bookmarkIndex = post.bookmarks.indexOf(userId);
    const isBookmarked = bookmarkIndex === -1 ? false : true;

    if (!isBookmarked) {
      post.bookmarks.push(userId);
    } else {
      post.bookmarks.splice(bookmarkIndex, 1);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: isBookmarked ? "Bookmark removed" : "Post bookmarked",
      isBookmarked: !isBookmarked,
      bookmarkCount: post.bookmarks.length
    });
  } catch (err) {
    console.error("Bookmark error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ===================== DELETE COMMENT =====================
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    // Check authorization
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully"
    });
  } catch (err) {
    console.error("Delete comment error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  postList,
  createPost,
  readMorePost,
  updatePost,
  deletePost,
  likes,
  bookmarkPost,
  addComment,
  deleteComment,
  getComments,
  incrementShare,
  searchPosts
}