const express = require('express');
const router = express.Router();

// Import your controller here
const userController = require('../controller/user.controller');

// Define the registration route
router.post('/api/register', userController.register);

module.exports = router;