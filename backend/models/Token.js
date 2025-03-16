const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['refresh', 'access'],
    required: true
  },
  blacklistedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 } // MongoDB TTL index - automatically remove expired documents
  }
})

module.exports = mongoose.model('Token', tokenSchema) 