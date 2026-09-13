# Unit 4: Redux Toolkit (RTK) Architecture for KIOT Fest

## 1. The 3 Core Pillars of Redux Toolkit

1. **Store (`configureStore`)**: The single source of truth containing all slices of state.
2. **Slices (`createSlice`)**: Bundles initial state, reducer functions, and generated action creators into one clean file.
3. **Hooks (`useSelector` & `useDispatch`)**: Connects React components to the store.

---

## 2. KIOT Fest `cartSlice.js` Implementation Pattern

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],          // Array of registered event objects
  totalAmount: 0,     // Sum of registration fees in ₹
  studentInfo: {
    name: '',
    rollNo: '',
    department: 'CSE',
    college: 'Knowledge Institute of Technology'
  }
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
    updateStudentInfo: (state, action) => {
      state.studentInfo = { ...state.studentInfo, ...action.payload };
    }
  }
});

export const { addToCart, removeFromCart, clearCart, updateStudentInfo } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.length;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectStudentInfo = (state) => state.cart.studentInfo;

export default cartSlice.reducer;
```

---

## 3. How Components Interact with Redux

### Component A: `RegisterButton.jsx` (Dispatching Action)
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems } from '../redux/slices/cartSlice';

export default function RegisterButton({ event }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isAdded = cartItems.some(item => item.id === event.id);

  return (
    <button
      onClick={() => dispatch(addToCart(event))}
      disabled={isAdded}
      className={`px-4 py-2 rounded-xl font-medium transition ${
        isAdded 
          ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 cursor-default'
          : 'bg-indigo-600 hover:bg-indigo-500 text-white'
      }`}
    >
      {isAdded ? '✓ Added to Cart' : `Register (₹${event.fee})`}
    </button>
  );
}
```

### Component B: `Navbar.jsx` (Reading State)
```javascript
import { useSelector } from 'react-redux';
import { selectCartCount } from '../redux/slices/cartSlice';

export default function Navbar() {
  const count = useSelector(selectCartCount);

  return (
    <nav className="flex justify-between items-center p-4">
      <span className="font-bold text-xl">KIOT FEST</span>
      <div className="relative">
        <span>🛒 Cart</span>
        {count > 0 && (
          <span className="absolute -top-2 -right-3 bg-indigo-500 text-xs px-2 py-0.5 rounded-full font-bold">
            {count}
          </span>
        )}
      </div>
    </nav>
  );
}
```
