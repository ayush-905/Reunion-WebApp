import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import propertyReducer from '../features/properties/propertySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
  },
})