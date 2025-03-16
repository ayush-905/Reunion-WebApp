const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser
} = require('../controllers/userController')
const { protect, verifyRefreshToken } = require('../middleware/authMiddleware')

// Public routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh-token', verifyRefreshToken, refreshToken)

// Protected routes
router.post('/logout', protect, logoutUser)

module.exports = router 