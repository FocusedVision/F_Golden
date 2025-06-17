import { configureStore, createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "Golden Reputation",
  initialState: {
    isLoading: false,
    theme: "dark",
    sidebarOpen: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { setLoading, toggleSidebar, setTheme } = appSlice.actions;
