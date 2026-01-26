// Backend configuration file
module.exports = {
  // Server
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  MONGO_URL: process.env.MONGO_URL,
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_key_change_in_production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  
  // CORS
  CORS_ORIGIN: (process.env.CORS_ORIGIN || 'https://d3hpld8vt7tywq.cloudfront.net').split(','),
  
  // Features
  ENABLE_IMAGE_UPLOAD: process.env.CLOUDINARY_NAME ? true : false,
  
  // Cloudinary (optional)
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
