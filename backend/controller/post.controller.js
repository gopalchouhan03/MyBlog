const { Post, Comment } = require("../model/postSchema");

const postList = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username fullName profileImage") // only fetch selected fields
      .sort({ date: -1 }); // latest first

    const formattedPost = posts.map(post => ({
      ...post._doc,
      author: post.author.username, // replace ObjectId with username
      fullName: post.author.fullName,
      profileImage: post.author.profileImage,
      date: post.date.toLocaleDateString("en-GB").slice(0, 8), // "dd/mm/yy"
    }));

    res.status(200).json({
      success: true,
      data: formattedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
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
      author: post.author.username, // replace ObjectId with username
      fullName: post.author.fullName,
      profileImage: post.author.profileImage,
      date: new Date(post.date).toLocaleDateString("en-IN", {
        weekday: "short", // Mon
        year: "numeric", // 2025
        month: "short",  // Jan
        day: "numeric",  // 16
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

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if user already liked
    const index = post.likes.indexOf(userId);
    if (index === -1) {
      // not liked yet → add like
      post.likes.push(userId);
    } else {
      // already liked → remove like (unlike)
      post.likes.splice(index, 1);
    }

    await post.save();

    res.status(200).json({ likes: post.likes.length, liked: index === -1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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

module.exports = {
  postList,
  createPost,
  readMorePost,
  likes,
  addComment,
  getComments,
  incrementShare,
  searchPosts
}