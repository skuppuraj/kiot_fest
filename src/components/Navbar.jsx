import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

/**
 * Navbar Component - Branch 09: useContext & Limitations
 * Directly consumes `useCart()` without needing props from parent!
 */
export default function Navbar() {
  const { cartCount, totalFee } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-black text-xl text-indigo-400">KIOT FEST 2026</span>
          <span className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded font-bold">
            Branch 09 (useContext)
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
          <Link href="/prop-drilling-demo" className="text-slate-400 hover:text-slate-200 transition">
            Compare with Step 08
          </Link>
        </div>

        {/* Cart Badge consuming context directly */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl">
            <span className="text-sm">🛒</span>
            <span className="text-xs font-bold text-slate-300">Cart</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-black transition-all ${
              cartCount > 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 animate-pulse' : 'bg-slate-800 text-slate-400'
            }`}>
              {cartCount}
            </span>
            {totalFee > 0 && (
              <span className="text-xs font-bold text-amber-400 hidden sm:inline ml-1">
                (₹{totalFee})
              </span>
            )}
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
          <Link href="/prop-drilling-demo" onClick={() => setMobileMenuOpen(false)} className="block text-slate-400 py-1">
            Compare with Step 08
          </Link>
        </div>
      )}
    </nav>
  );
}
