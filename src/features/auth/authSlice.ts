import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import type { LoginResponse, AuthState, UserProfile } from '@/typings';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiSlice.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          const { accessToken } = action.payload;

          state.token = accessToken;
          state.user = null;

          localStorage.setItem('token', accessToken);
          state.error = null;
        },
      )
      .addMatcher(apiSlice.endpoints.login.matchRejected, (state, action) => {
        state.error = action.error.message || 'Login failed';
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout, setProfile } = authSlice.actions;

export default authSlice.reducer;
