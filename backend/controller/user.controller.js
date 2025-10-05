const User = require("../model/userSchema");
const { Post, Comment } = require("../model/postSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();



// ===================== REGISTER =====================
const register = async (req, res) => {
  try {
    const { username, fullName, email, password, bio, profileImage } = req.body;

    // 1️⃣ Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { username: { $regex: new RegExp("^" + username + "$", "i") } },
        { email: email.toLowerCase() },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this username or email already exists",
      });
    }

    // 3️⃣ Create user (password will be hashed automatically via pre-save middleware)
    const user = new User({
      username: username.trim(),
      fullName: fullName || "",
      email: email.toLowerCase(),
      password, // plain password, will be hashed
      bio: bio || "",
      profileImage: profileImage || "",
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { id: user._id, username: user.username, email: user.email },
      token
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ===================== LOGIN =====================
const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username/email and password are required",
      });
    }

    username = String(username).trim();
    password = String(password).trim();

    // 1️⃣ Find user by username (case-insensitive) or email
    const user = await User.findOne({
      $or: [
        { username: { $regex: new RegExp("^" + username + "$", "i") } },
        { email: username.toLowerCase() },
      ],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password",
      });
    }

    // 2️⃣ Compare password using schema method
    const isMatch = await user.comparePassword(password);
    console.log("comparePassword result:", isMatch); // Debug

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password",
      });
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





const protectedRoute = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ success: false, message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, message: "Access granted!", user: decoded });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// PUT /api/users/:id/edit
const editProfile = async (req, res) => {
  try {
    const { id } = req.params; // userId from URL
    const { fullName, bio, profileImage } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { fullName, bio, profileImage },
      { new: true } // return updated document
    ).select("-password"); // don't return password

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const profileData = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const posts = await Post.find({ author: id }).populate("author");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or not logged in",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found",
      data: {
        user,
        posts
      },
    });

  } catch (err) {
    console.error("ProfileData Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ username: userId }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get all posts of a user
const getUserPosts = async (req, res) => {
  const { userId } = req.params; // userId from URL

  try {
    const posts = await Post.find({ author: userId }) // filter posts by author
      .populate("author", "username email avatar") // populate author info
      .sort({ createdAt: -1 }); // latest posts first

    console.log(posts); // all posts by this user

    res.status(200).json({
      success: true,
      posts,
      postsCount: posts.length,
    });
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// ✅ Follow a user
// ✅ Follow a user
const followUser = async (req, res) => {
  const { userId } = req.params;           // ID of the user to follow
  const { userId: currentUserId } = req.body; // ID of the logged-in user

  try {
    if (userId === currentUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const userToFollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (userToFollow.followers.includes(currentUserId)) {
      return res.status(400).json({
        success: false,
        message: "Already following this user",
      });
    }

    // Add current user to followers of the target user
    userToFollow.followers.push(currentUserId);

    // Add target user to following of the current user
    currentUser.following.push(userId);

    await userToFollow.save();
    await currentUser.save();

    res.status(200).json({
      success: true,
      message: "User followed successfully",
    });
  } catch (err) {
    console.error("Error following user:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ Unfollow a user
const unfollowUser = async (req, res) => {
  const { userId } = req.params;           // ID of the user to unfollow
  const { userId: currentUserId } = req.body; // ID of the logged-in user

  try {
    if (userId === currentUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot unfollow yourself",
      });
    }

    const userToUnfollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!userToUnfollow.followers.includes(currentUserId)) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user",
      });
    }

    // Remove current user from followers of the target user
    userToUnfollow.followers = userToUnfollow.followers.filter(
      f => f.toString() !== currentUserId
    );

    // Remove target user from following of the current user
    currentUser.following = currentUser.following.filter(
      f => f.toString() !== userId
    );

    await userToUnfollow.save();
    await currentUser.save();

    res.status(200).json({
      success: true,
      message: "User unfollowed successfully",
    });
  } catch (err) {
    console.error("Error unfollowing user:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {
  register,
  login,
  protectedRoute,
  editProfile,
  profileData,
  getUserProfile,
  getUserPosts,
  followUser,
  unfollowUser
}