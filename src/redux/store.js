import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import eventReducer from './slices/eventSlice';
import authReducer from './slices/authSlice';
import { saveState } from './localStorage';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    events: eventReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Subscribe to state changes and persist cart
store.subscribe(() => {
  saveState(store.getState());
});
