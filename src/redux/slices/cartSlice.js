import { createSlice } from '@reduxjs/toolkit';

/**
 * Cart Slice for KIOT Fest
 * Solves the prop-drilling problem by centralizing:
 * - Selected events in student's registration cart
 * - Student info across multi-event checkout
 * - Pass generation state
 */
const initialState = {
  items: [], // Array of event objects
  totalAmount: 0,
  studentInfo: {
    name: '',
    rollNo: '',
    department: 'CSE',
    year: 3,
    college: 'Knowledge Institute of Technology',
    email: '',
    phone: ''
  },
  isCartOpen: false,
  lastGeneratedPass: null
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const event = action.payload;
      const exists = state.items.find(item => item.id === event.id);
      
      if (!exists) {
        state.items.push(event);
        state.totalAmount += Number(event.registration_fee || event.fee || 0);
      }
    },
    removeFromCart: (state, action) => {
      const eventId = action.payload;
      const index = state.items.findIndex(item => item.id === eventId);
      
      if (index !== -1) {
        state.totalAmount -= Number(state.items[index].registration_fee || state.items[index].fee || 0);
        state.items.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    updateStudentInfo: (state, action) => {
      state.studentInfo = { ...state.studentInfo, ...action.payload };
    },
    hydrateCart: (state, action) => {
      if (action.payload) {
        state.items = action.payload.items || [];
        state.totalAmount = action.payload.totalAmount || 0;
        if (action.payload.studentInfo) {
          state.studentInfo = { ...state.studentInfo, ...action.payload.studentInfo };
        }
      }
    },
    setLastGeneratedPass: (state, action) => {
      state.lastGeneratedPass = action.payload;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  toggleCart,
  setCartOpen,
  updateStudentInfo,
  hydrateCart,
  setLastGeneratedPass
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.length;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectIsCartOpen = (state) => state.cart.isCartOpen;
export const selectStudentInfo = (state) => state.cart.studentInfo;
export const selectLastGeneratedPass = (state) => state.cart.lastGeneratedPass;

export default cartSlice.reducer;
