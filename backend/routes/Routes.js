const express = require('express')
const router = express.Router()
const { getAll, setProp, getAllMe, updateProp, deleteProp } = require('../controllers/propertiesController')
const { protect } = require('../middleware/authMiddleware')
const {registerUser, loginUser } = require('../controllers/userController')
const { sendEmail } = require('../controllers/emailContoller')
const userRoutes = require('./userRoutes')

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/list-properties',getAll)
router.post('/property',protect, setProp)
router.get('/property/me',protect, getAllMe)
router.put('/property/:id',protect, updateProp)
router.delete('/property/:id',protect, deleteProp)

router.post('/api/send-email', sendEmail)

// Mount routes
router.use('/users', userRoutes)

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'API is working' })
})

module.exports = router
