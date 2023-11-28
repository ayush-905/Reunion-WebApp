import axios from 'axios'

const API_URL = 'http://localhost:5001/api/'

// Create new property
const createProperty = async (propertyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + 'property', propertyData, config)

  return response.data
}

// Get user property
const getProperty = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'property/me', config)

  return response.data
}

// Delete user property
const deleteProperty = async (propertyId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + 'property' + propertyId, config)

  return response.data
}

const propertyService = {
  createProperty,
  getProperty,
  deleteProperty,
}

export default propertyService
