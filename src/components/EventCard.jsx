import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

/**
 * EventCard Component - Branch 09: useContext & Limitations
 * Directly consumes `useCart()` hook to register and unregister events!
 */
export default function EventCard({ 
  event,
  id: propId,
  title: propTitle, 
  department: propDept, 
  description: propDesc, 
  prize: propPrize, 
  fee: propFee, 
  date: propDate, 
  seatsLeft: propSeats,
}) {
  const { cart, addToCart, removeFromCart } = useCart();

  const data = event || {
    id: propId,
    title: propTitle,
    department: propDept,
    description: propDesc,
    prize: propPrize,
    fee: propFee,
    date: propDate,
    seatsLeft: propSeats
  };

  const { id, title, department, description, prize, fee, date, seatsLeft } = data;
  const isSoldOut = seatsLeft === 0;
  const isInCart = cart.some((item) => item.id === id);

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-indigo-500/50 transition">
      <div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {department}
          </span>
          {isSoldOut ? (
            <span className="text-xs font-bold text-rose-400 bg-rose-500/20 px-2.5 py-1 rounded-full border border-rose-500/30">
              🔴 SOLD OUT
            </span>
          ) : (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
              🟢 {seatsLeft} Seats Left
            </span>
          )}
        </div>

        <Link href={`/events/${id}`} className="block group">
          <h3 className="text-xl font-bold mt-3 text-white group-hover:text-indigo-400 transition">
            {title}
          </h3>
        </Link>
        
        {description && <p className="text-sm text-slate-400 mt-2 line-clamp-2">{description}</p>}
        {date && <p className="text-xs text-slate-500 mt-3">📅 {date}</p>}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center">
        <div>
          <span className="text-xs text-slate-500 block uppercase font-bold tracking-wider">Prize Pool</span>
          <span className="font-extrabold text-amber-400 text-lg">{prize}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link 
            href={`/events/${id}`}
            className="text-xs text-indigo-400 hover:text-indigo-300 underline font-semibold px-2 py-1"
          >
            Details →
          </Link>
          
          {isSoldOut ? (
            <button 
              disabled 
              className="px-3.5 py-2 bg-slate-800 text-slate-500 rounded-xl text-xs font-bold cursor-not-allowed"
            >
              Closed
            </button>
          ) : isInCart ? (
            <button 
              onClick={() => removeFromCart(id)}
              className="px-3.5 py-2 bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 rounded-xl text-xs font-bold transition shadow-sm"
            >
              Remove
            </button>
          ) : (
            <button 
              onClick={() => addToCart(data)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white transition shadow-lg shadow-indigo-600/30"
            >
              Add to Cart (₹{fee})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
