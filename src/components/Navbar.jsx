import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, toggleCart } from '../redux/slices/cartSlice';
import {
  Sparkles,
  ShoppingBag,
  Menu,
  X,
  Ticket,
  GraduationCap
} from 'lucide-react';

/**
 * Navbar Component - Branch 17: Image Optimization, QR Passes & SEO
 */
export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Events', href: '/events' },
    { name: 'My Passes', href: '/my-tickets' },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 no-print ${mobileMenuOpen ? 'bg-[#0a0f1d] border-b border-slate-800' : 'bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                  KIOT FEST
                </span>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-amber-400/30">
                  2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden xs:block font-medium tracking-wide">
                Knowledge Institute of Technology
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Cart & Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Registration Cart Button */}
            <button
              onClick={() => dispatch(toggleCart())}
              aria-label="View Registration Cart"
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 hover:text-white transition flex items-center space-x-2 min-h-[44px] min-w-[44px] justify-center"
            >
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              <span className="hidden sm:inline text-sm font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Navigation"
              className="md:hidden p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-rose-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 z-50 bg-[#0a0f1d] border-t border-slate-800 p-6 flex flex-col justify-between overflow-y-auto min-h-[calc(100dvh-4rem)] sm:min-h-[calc(100dvh-5rem)]">
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3">
              Navigation Menu
            </p>
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition min-h-[44px] w-full ${
                    active
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-300 hover:bg-slate-800/70'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="text-xs opacity-60">→</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-800/80">
            <div className="flex items-center space-x-3 text-slate-400 text-xs">
              <GraduationCap className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <span>Knowledge Institute of Technology, Kakapalayam, Salem</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
