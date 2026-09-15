import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import eventReducer from './slices/eventSlice';
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    events: eventReducer,
  },
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});

// Subscribe to state changes and persist cart
store.subscribe(() => {
  saveState(store.getState());
});
