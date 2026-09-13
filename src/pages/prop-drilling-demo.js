import React, { useState } from 'react';

/**
 * UNIT 4 - STEP 1: THE PROP-DRILLING NIGHTMARE
 * 
 * 🔴 THE PROBLEM:
 * The Cart state lives in App / Parent.
 * To update the cart from a deep child button, we have to pass 'cart' and 'addToCart'
 * through 4 layers of components:
 * App -> EventGrid -> EventCard -> RegisterButton
 * And also pass it to Navbar and CartDrawer!
 */

function RegisterButton({ event, cart, onAddToCart }) {
  const isInCart = cart.some(item => item.id === event.id);
  return (
    <button 
      onClick={() => onAddToCart(event)}
      className="px-3 py-1.5 bg-indigo-600 rounded text-xs text-white"
    >
      {isInCart ? 'In Cart' : 'Add to Cart'}
    </button>
  );
}

function EventCard({ event, cart, onAddToCart }) {
  // EventCard doesn't care about cart, it is forced to forward props!
  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between">
      <span>{event.title}</span>
      <RegisterButton event={event} cart={cart} onAddToCart={onAddToCart} />
    </div>
  );
}

export default function PropDrillingDemo() {
  const [cart, setCart] = useState([]);
  const handleAddToCart = (item) => setCart([...cart, item]);

  return (
    <div className="p-8 max-w-xl mx-auto text-white space-y-4">
      <h2 className="text-xl font-bold">Prop Drilling Demo (Cart: {cart.length})</h2>
      <EventCard event={{ id: 1, title: 'Hackathon' }} cart={cart} onAddToCart={handleAddToCart} />
    </div>
  );
}
