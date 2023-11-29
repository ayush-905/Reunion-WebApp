const express = require('express')
const router = express.Router()
const { getAll, setProp, getAllMe, updateProp, deleteProp } = require('../controllers/propertiesController')
const { protect } = require('../middleware/authMiddleware')
const {registerUser, loginUser } = require('../controllers/userController')
const { sendEmail } = require('../controllers/emailContoller')

router.post('/api/register', registerUser)
router.post('/api/login', loginUser)

router.get('/api/list-properties',getAll)
router.post('/api/property',protect, setProp)
router.get('/api/property/me',protect, getAllMe)
router.put('/api/property/:id',protect, updateProp)
router.delete('/api/property/:id',protect, deleteProp)

router.post('/api/send-email', sendEmail)

module.exports = router
