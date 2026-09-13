import { createSlice } from '@reduxjs/toolkit';

/**
 * Authentication Slice for Coordinator / Faculty Portal
 * Manages coordinator login state, permissions, and session persistence.
 */
const initialState = {
  isAuthenticated: false,
  coordinator: null, // { username, name, department, role }
  token: null,
  loginError: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.coordinator = action.payload.coordinator;
      state.token = action.payload.token;
      state.loginError = null;
      if (typeof window !== 'undefined') {
        localStorage.setItem('kiot_coordinator_auth', JSON.stringify(action.payload));
      }
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.coordinator = null;
      state.token = null;
      state.loginError = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.coordinator = null;
      state.token = null;
      state.loginError = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('kiot_coordinator_auth');
      }
    },
    restoreSession: (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.coordinator = action.payload.coordinator;
        state.token = action.payload.token;
      }
    }
  }
});

export const { loginSuccess, loginFailure, logout, restoreSession } = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCoordinator = (state) => state.auth.coordinator;
export const selectLoginError = (state) => state.auth.loginError;

export default authSlice.reducer;
