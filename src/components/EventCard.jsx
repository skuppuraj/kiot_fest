import React from 'react';

/**
 * Reusable EventCard Component
 * Demonstrates Conditional Rendering & Event Action Props:
 * 1. Sold-out badge vs seats remaining
 * 2. Disabled "Closed" button vs active "Quick Register" button triggering registration modal
 */
export default function EventCard({ 
  id,
  title, 
  department, 
  description, 
  prize, 
  fee, 
  date, 
  seatsLeft,
  onRegister 
}) {
  const isSoldOut = seatsLeft === 0;

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
        <h3 className="text-xl font-bold mt-2 text-white">{title}</h3>
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
        {date && <p className="text-xs text-slate-500 mt-2">📅 {date}</p>}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
        <span className="font-bold text-amber-400">{prize}</span>
        {isSoldOut ? (
          <button 
            disabled 
            className="px-4 py-2 bg-slate-800 text-slate-500 rounded-xl text-xs font-bold cursor-not-allowed"
          >
            Closed
          </button>
        ) : (
          <button 
            onClick={onRegister || (() => alert(`Registering for ${title}!`))}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white transition"
          >
            Quick Register (₹{fee})
          </button>
        )}
      </div>
    </div>
  );
}
