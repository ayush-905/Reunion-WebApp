import axiosInstance from '../../utils/axiosConfig'

// Register user
const register = async (userData) => {
  const response = await axiosInstance.post('users/register', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    localStorage.setItem('refreshToken', response.data.refreshToken)
  }
  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axiosInstance.post('users/login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    localStorage.setItem('refreshToken', response.data.refreshToken)
  }
  return response.data
}

// Logout user
const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken')
    await axiosInstance.post('users/logout', { refreshToken })
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    localStorage.removeItem('user')
    localStorage.removeItem('refreshToken')
  }
}

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  const response = await axiosInstance.post('users/refresh-token', { refreshToken })
  
  const user = JSON.parse(localStorage.getItem('user'))
  user.accessToken = response.data.accessToken
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('refreshToken', response.data.refreshToken)
  
  return response.data.accessToken
}

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user?.accessToken
}

const authService = {
  register,
  logout,
  login,
  refreshAccessToken,
  getAccessToken,
}

export default authService
