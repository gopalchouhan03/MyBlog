// Helper utilities for the backend
const slugify = require('slugify');

/**
 * Generate a slug from title
 */
const generateSlug = (title) => {
  return slugify(title, {
    lower: true,
    strict: true,
    trim: true
  });
};

/**
 * Calculate read time in minutes
 */
const calculateReadTime = (text) => {
  const wordsPerMinute = 200; // Average reading speed
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(minutes, 1); // Minimum 1 minute
};

/**
 * Generate excerpt from content
 */
const generateExcerpt = (content, length = 150) => {
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  return text.substring(0, length).concat('...');
};

/**
 * Format date for display
 */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get relative time (e.g., "2 days ago")
 */
const getRelativeTime = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSecs < 60) return `${diffSecs}s ago`;
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
};

/**
 * Generate unique slug with timestamp/random suffix
 */
const generateUniqueSlug = async (baseSlug, Model) => {
  let slug = baseSlug;
  let counter = 1;
  
  while (await Model.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
};

/**
 * Sanitize string input
 */
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, 10000); // Max length
};

/**
 * Format API response
 */
const apiResponse = (success, message, data = null, statusCode = 200) => {
  return {
    success,
    message,
    data,
    statusCode
  };
};

module.exports = {
  generateSlug,
  calculateReadTime,
  generateExcerpt,
  formatDate,
  getRelativeTime,
  generateUniqueSlug,
  sanitizeInput,
  apiResponse,
};
