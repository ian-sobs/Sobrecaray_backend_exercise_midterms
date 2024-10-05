const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


// POST /register
router.post('/register', userController.register);

// POST /login
router.post('/login', userController.login);

// GET /profile (Protected)
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
