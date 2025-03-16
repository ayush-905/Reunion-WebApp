import axios from 'axios'
import authService from '../features/auth/authService'

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_API_KEY || 'http://localhost:5001/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Variable to track if we're refreshing token
let isRefreshing = false
// Store callbacks for requests that are waiting for new token
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Prevent infinite loops and handle non-401 errors
    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    // If token refresh is already in progress, queue this request
    if (isRefreshing) {
      try {
        const token = await new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
        originalRequest.headers.Authorization = `Bearer ${token}`
        return axiosInstance(originalRequest)
      } catch (err) {
        return Promise.reject(err)
      }
    }

    // Start token refresh process
    originalRequest._retry = true
    isRefreshing = true

    try {
      const newAccessToken = await authService.refreshAccessToken()
      processQueue(null, newAccessToken)
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return await axiosInstance(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      // Clear auth state on refresh token failure
      await authService.logout()
      window.location.href = '/login'
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default axiosInstance 