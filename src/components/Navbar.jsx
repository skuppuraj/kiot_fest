import React, { useState } from 'react';
import Link from 'next/link';

/**
 * Navbar Component - Branch 08: Prop-Drilling Problem
 * Accepts `cartCount` as a drilled prop from parent page/layout.
 */
export default function Navbar({ cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-black text-xl text-indigo-400">KIOT FEST 2026</span>
          <span className="text-xs px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded font-bold">
            Branch 08
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="text-slate-300 hover:text-white transition">
            Home
          </Link>
          <Link href="/events" className="text-slate-300 hover:text-white transition">
            All Events
          </Link>
          <Link href="/prop-drilling-demo" className="text-amber-400 hover:text-amber-300 font-semibold transition">
            Prop Drilling Demo
          </Link>
        </div>

        {/* Cart Badge with drilled cartCount */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl">
            <span className="text-sm">🛒</span>
            <span className="text-xs font-bold text-slate-300">Cart</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
              cartCount > 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40' : 'bg-slate-800 text-slate-400'
            }`}>
              {cartCount}
            </span>
          </div>

          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1d] border-b border-slate-800 p-4 space-y-3">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 py-1">
            Home
          </Link>
          <Link href="/events" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 py-1">
            All Events
          </Link>
          <Link href="/prop-drilling-demo" onClick={() => setMobileMenuOpen(false)} className="block text-amber-400 py-1 font-semibold">
            Prop Drilling Demo
          </Link>
        </div>
      )}
    </nav>
  );
}
