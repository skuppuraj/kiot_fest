import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addToCart = (item) => {
    setCart((prev) => {
      if (prev.some((e) => e.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const cartCount = cart.length;
  const totalFee = cart.reduce((sum, item) => sum + (item.fee || item.registrationFee || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalFee,
        isDrawerOpen,
        addToCart,
        removeFromCart,
        clearCart,
        toggleDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    // Graceful fallback for SSR or components rendered outside provider
    return {
      cart: [],
      cartCount: 0,
      totalFee: 0,
      isDrawerOpen: false,
      addToCart: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      toggleDrawer: () => {},
    };
  }
  return context;
}
