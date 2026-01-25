const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  desc: { type: String, required: true },
  content: { type: String, default: "" }, // Full markdown content
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  // Blog metadata
  slug: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  tags: [{ type: String, lowercase: true, trim: true }],
  coverImage: { type: String, default: null }, // URL to cover image
  excerpt: { type: String, default: "" }, // Short description
  
  // Engagement metrics
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  viewCount: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  
  // Publication status
  isDraft: { type: Boolean, default: true },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date, default: null },
  
  // Reading metrics
  readTime: { type: Number, default: 0 }, // in minutes
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// ✅ Define models
const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

// ✅ Export both
module.exports = { Post, Comment };
