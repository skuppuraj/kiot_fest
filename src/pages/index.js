import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import { ALL_EVENTS } from '../data/events';

export default function HomePage() {
  // State lifted to page level (Prop-Drilling Demonstration)
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  // Handlers to pass down through intermediate component tiers
  const handleAddToCart = (event) => {
    if (!cart.some(item => item.id === event.id)) {
      setCart(prev => [...prev, event]);
    }
  };

  const handleRemoveFromCart = (eventId) => {
    setCart(prev => prev.filter(item => item.id !== eventId));
  };

  const departments = ['ALL', 'CSE', 'ECE', 'AI&DS', 'MECH'];

  const filteredEvents = ALL_EVENTS.filter(e => {
    const matchDept = selectedDept === 'ALL' || e.department === selectedDept;
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col justify-between">
      <Head>
        <title>KIOT FEST 2026 | Prop-Drilling Problem</title>
        <meta name="description" content="Prop-drilling limitations in React state architecture" />
      </Head>

      {/* Prop Drilling: Passing cart count to Navbar */}
      <Navbar cartCount={cart.length} />

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Hero Section */}
        <section className="text-center py-10 border-b border-slate-800/80 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
            Unit 4 — Step 08
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 font-outfit">
            The Prop-Drilling Challenge
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base leading-relaxed">
            Cart state lives here in <code className="text-indigo-300 font-mono bg-indigo-950/50 px-1.5 py-0.5 rounded">HomePage</code>. 
            To update it from an event card button, we must manually thread <code className="text-amber-300 font-mono bg-amber-950/50 px-1.5 py-0.5 rounded">cart</code> and handlers down through every component layer.
          </p>

          <div className="mt-4 flex items-center justify-center gap-4">
            <Link 
              href="/prop-drilling-demo"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 underline"
            >
              Inspect 4-Tier Prop-Drilling Diagram & Demo →
            </Link>
          </div>
        </section>

        {/* Search & Department Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workshops and hackathons..."
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
          />

          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDept === dept
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Event Grid with Drilled Props */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <p className="text-lg font-bold text-slate-300">No Events Found matching &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDept('ALL');
              }}
              className="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-bold text-white hover:bg-indigo-500"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isInCart={cart.some((item) => item.id === event.id)}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        Knowledge Institute of Technology • KIOT FEST 2026 Web Development Workshop
      </footer>
    </div>
  );
}
