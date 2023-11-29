const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {

    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      const user = await User.findById(decoded.id).select('-password')
      if (!user) {
        res.status(401)
        throw new Error('User not found')
      }
      req.user = user
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized for this action')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized for this action, no token')
  }
})

module.exports = { protect }
