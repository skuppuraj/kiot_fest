import React from 'react';

/**
 * Reusable EventCard Component
 * Solves Monolithic JSX by accepting dynamic data via PROPS
 */
export default function EventCard({ title, department, description, prize, fee, date }) {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-indigo-500/50 transition">
      <div>
        <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300">{department}</span>
        <h3 className="text-xl font-bold text-white mt-2">{title}</h3>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
        <p className="text-xs text-slate-500 mt-2">📅 {date}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
        <span className="font-bold text-amber-400">Prize: {prize}</span>
        <button 
          onClick={() => alert("Props are immutable! We need useState to make buttons reactive.")}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition"
        >
          Register (₹{fee})
        </button>
      </div>
    </div>
  );
}
