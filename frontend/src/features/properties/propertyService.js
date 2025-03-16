import axiosInstance from '../../utils/axiosConfig'

// Create new property
const createProperty = async (propertyData) => {
  const response = await axiosInstance.post('property', propertyData)
  return response.data
}

// Get user property
const getProperty = async () => {
  const response = await axiosInstance.get('property/me')
  return response.data
}

// Update user property
const updateProperty = async (propertyData, propertyId) => {
  const response = await axiosInstance.put(`property/${propertyId}`, propertyData)
  return response.data
}

// Delete user property
const deleteProperty = async (propertyId) => {
  const response = await axiosInstance.delete(`property/${propertyId}`)
  return response.data
}

const propertyService = {
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
}

export default propertyService
