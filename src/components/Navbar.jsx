import React from 'react';

export default function Navbar() {
  return (
    <nav className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950">
      <div className="flex items-center space-x-2">
        <span className="font-black text-xl text-indigo-400">KIOT FEST 2026</span>
        <span className="text-xs px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded font-bold">Props Demo</span>
      </div>
      <div className="text-xs text-slate-400">Knowledge Institute of Technology</div>
    </nav>
  );
}
