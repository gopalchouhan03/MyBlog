// Validation utilities for input validation
const { body, param, query, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// User validation rules
const userValidationRules = () => {
  return [
    body('username')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters')
      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    body('fullName')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Full name must not exceed 100 characters')
  ];
};

// Login validation rules
const loginValidationRules = () => {
  return [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username or email is required'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ];
};

// Post validation rules
const postValidationRules = () => {
  return [
    body('title')
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Title must be between 5 and 200 characters'),
    body('desc')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Description must be at least 10 characters'),
    body('content')
      .optional()
      .trim(),
    body('tags')
      .optional()
      .isArray()
      .withMessage('Tags must be an array'),
  ];
};

// Comment validation rules
const commentValidationRules = () => {
  return [
    body('text')
      .trim()
      .isLength({ min: 1, max: 5000 })
      .withMessage('Comment must be between 1 and 5000 characters'),
    body('userId')
      .notEmpty()
      .isMongoId()
      .withMessage('Invalid user ID')
  ];
};

// Profile update validation rules
const profileUpdateValidationRules = () => {
  return [
    body('fullName')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('Full name must not exceed 100 characters'),
    body('bio')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Bio must not exceed 500 characters'),
    body('profileImage')
      .optional()
      .isURL()
      .withMessage('Invalid image URL')
  ];
};

module.exports = {
  handleValidationErrors,
  userValidationRules,
  loginValidationRules,
  postValidationRules,
  commentValidationRules,
  profileUpdateValidationRules,
};
