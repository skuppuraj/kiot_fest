import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import eventReducer from './slices/eventSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    events: eventReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
