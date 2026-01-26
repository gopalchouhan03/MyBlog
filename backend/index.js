const express = require('express');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const config = require('./config');

const routes = require('./routes/post.routes');

const app = express();
app.set("trust proxy", 1);
// ============ SECURITY MIDDLEWARE ============
app.use(helmet()); // Set HTTP security headers

// Rate limiting - more lenient in development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: config.NODE_ENV === 'development' ? 1000 : 100, // 1000 in dev, 100 in prod
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// ============ CORS & BODY PARSER ============
app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ============ ROUTES ============
app.use('/api', routes);

// ============ HEALTH CHECK ============
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

// ============ ERROR HANDLING ============
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ============ 404 HANDLER ============
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ============ DATABASE CONNECTION ============
const PORT = config.PORT;

mongoose.connect(config.MONGO_URL)
    .then(() =>  console.log('✅ Connected to MongoDB'))
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
      process.exit(1);
    });
    
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT} (${config.NODE_ENV})`);
});