import { configureStore, createSlice } from '@reduxjs/toolkit'

// Create a simple app slice for initial state
const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
    theme: 'dark',
    sidebarOpen: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { setLoading, toggleSidebar, setTheme } = appSlice.actions

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 