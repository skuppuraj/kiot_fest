import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import eventReducer from './slices/eventSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    events: eventReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
