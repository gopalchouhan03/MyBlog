// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
require('dotenv').config();
const config = require('../config');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Expected format: "Bearer <token>"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      console.error("Auth Middleware Error: Invalid token format. Header:", authHeader);
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    const token = parts[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    // Verify token using JWT_SECRET from config
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Attach user data to request
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
    };

    next(); // continue to controller
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    console.error("Auth Middleware JWT_SECRET check:", !!config.JWT_SECRET);
    return res.status(401).json({ success: false, message: "Unauthorized or token expired" });
  }
};

module.exports = authMiddleware;
