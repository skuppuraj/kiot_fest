import React from 'react';
import Link from 'next/link';

/**
 * Reusable EventCard Component
 * Features:
 * - Dynamic parameter link to `/events/[id]`
 * - Conditional rendering for sold out state
 * - Callback for quick registration modal
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
  onRegister,
  onQuickRegister
}) {
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
  const handleRegister = onQuickRegister || onRegister;

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-indigo-500/50 transition">
      <div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
            {department}
          </span>
          {isSoldOut ? (
            <span className="text-xs font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
              🔴 SOLD OUT
            </span>
          ) : (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
              🟢 {seatsLeft} Seats Left
            </span>
          )}
        </div>

        <Link href={`/events/${id}`} className="block group">
          <h3 className="text-xl font-bold mt-2 text-white group-hover:text-indigo-400 transition">
            {title}
          </h3>
        </Link>
        
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
        {date && <p className="text-xs text-slate-500 mt-2">📅 {date}</p>}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
        <span className="font-bold text-amber-400">{prize}</span>
        <div className="flex items-center gap-2">
          <Link 
            href={`/events/${id}`}
            className="text-xs text-indigo-400 hover:text-indigo-300 underline font-semibold"
          >
            Details →
          </Link>
          {isSoldOut ? (
            <button 
              disabled 
              className="px-3 py-1.5 bg-slate-800 text-slate-500 rounded-xl text-xs font-bold cursor-not-allowed"
            >
              Closed
            </button>
          ) : (
            <button 
              onClick={() => handleRegister ? handleRegister(data) : alert(`Registering for ${title}!`)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white transition"
            >
              Quick Register (₹{fee})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
