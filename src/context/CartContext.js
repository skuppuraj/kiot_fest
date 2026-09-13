import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (event) => {
    if (!items.some((i) => i.id === event.id)) {
      setItems([...items, event]);
    }
  };

  const removeFromCart = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, cartCount: items.length }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
