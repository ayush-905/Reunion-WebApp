const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Token = require('../models/Token')

const protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(401)
    throw new Error('Not authorized, no token or invalid format')
  }

  try {
    // Get token from header
    const token = req.headers.authorization.slice(7)

    // Check if token is blacklisted
    const isBlacklisted = await Token.findOne({ token, type: 'access' })
    if (isBlacklisted) {
      res.status(401)
      throw new Error('Token has been revoked')
    }

    // Verify token with explicit options
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
    })

    const user = await User.findById(decoded.id).select('-password')
    
    if (!user) {
      res.status(401)
      throw new Error('User not found or deactivated')
    }

    // Check if token was issued before password change
    if (user.passwordChangedAt && decoded.iat < user.passwordChangedAt.getTime() / 1000) {
      res.status(401)
      throw new Error('User recently changed password. Please login again')
    }

    req.user = user
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401)
      throw new Error('Invalid token')
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401)
      throw new Error('Token expired')
    } else {
      console.error('Auth error:', error)
      res.status(500)
      throw new Error('Authentication failed')
    }
  }
})

// New middleware to verify refresh tokens
const verifyRefreshToken = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    res.status(401)
    throw new Error('Refresh token required')
  }

  try {
    // Check if refresh token is blacklisted
    const isBlacklisted = await Token.findOne({ token: refreshToken, type: 'refresh' })
    if (isBlacklisted) {
      res.status(401)
      throw new Error('Refresh token has been revoked')
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    req.user = { id: decoded.id }
    next()
  } catch (error) {
    res.status(401)
    throw new Error('Invalid refresh token')
  }
})

module.exports = { protect, verifyRefreshToken }
