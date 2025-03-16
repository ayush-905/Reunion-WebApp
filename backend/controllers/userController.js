const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const asyncHandler=require('express-async-handler')
const Token = require('../models/Token')

//register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please add all fields')
    }
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
 
  //existing user login
  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const { accessToken, refreshToken } = generateTokens(user._id)
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  })
  
  //generate jwt 
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    })
  }

  // Generate tokens
  const generateTokens = (id) => {
    return {
      accessToken: jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15m',
      }),
      refreshToken: jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
      })
    }
  }

  const refreshToken = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id)

    // Blacklist the old refresh token
    const oldRefreshToken = req.body.refreshToken
    await Token.create({
      token: oldRefreshToken,
      type: 'refresh',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    })

    res.json({
      accessToken,
      refreshToken: newRefreshToken
    })
  })

  const logoutUser = asyncHandler(async (req, res) => {
    const accessToken = req.headers.authorization.slice(7)
    const { refreshToken } = req.body

    // Blacklist both tokens
    await Promise.all([
      Token.create({
        token: accessToken,
        type: 'access',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
      }),
      Token.create({
        token: refreshToken,
        type: 'refresh',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      })
    ])

    res.json({ message: 'Logged out successfully' })
  })

  module.exports={ registerUser, loginUser, refreshToken, logoutUser }
