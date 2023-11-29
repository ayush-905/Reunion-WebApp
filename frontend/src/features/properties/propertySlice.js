import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import propertyService from './propertyService'
import { toast } from 'react-toastify'

const initialState = {
  property: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new property
export const createProperty = createAsyncThunk('property/create', async (PropertyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const prop = await propertyService.createProperty(PropertyData, token)
      toast.success("Property added successfully")
      return prop
    } catch (error) {
      const message = ((error.response &&error.response.data && error.response.data.message) 
      || error.message || error.toString())
      toast.error("Property can not be added")
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user property
export const getProperty = createAsyncThunk('property/getAll', async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await propertyService.getProperty(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user property
export const deleteProperty = createAsyncThunk('property/delete', async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await propertyService.deleteProperty(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProperty.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.property.push(action.payload)
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProperty.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.property = action.payload
      })
      .addCase(getProperty.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteProperty.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.property = state.property.filter(
          (property) => property._id !== action.payload.id
        )
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = propertySlice.actions
export default propertySlice.reducer
