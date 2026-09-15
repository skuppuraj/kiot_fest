import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import { ALL_EVENTS } from '../data/events';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  // Notice: cart state is NOT here! It lives in CartContext.
  const { cartCount, clearCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

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
        <title>KIOT FEST 2026 | React Context API</title>
        <meta name="description" content="Teleporting state with useContext and exploring re-render limits" />
      </Head>

      {/* Navbar reads CartContext directly! No props passed */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Hero Section */}
        <section className="text-center py-10 border-b border-slate-800/80 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
            Unit 4 — Step 09
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 font-outfit">
            Teleporting State with useContext
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base leading-relaxed">
            Prop-drilling eliminated! Every component can now read <code className="text-indigo-300 font-mono bg-indigo-950/50 px-1.5 py-0.5 rounded">useCart()</code> directly.
            However, whenever <code className="text-amber-300 font-mono bg-amber-950/50 px-1.5 py-0.5 rounded">cart</code> updates, all consuming components re-render simultaneously.
          </p>

          {/* Context status banner */}
          <div className="mt-6 p-4 max-w-xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div className="text-left text-xs">
              <span className="text-slate-400">Context Cart Count: </span>
              <span className="font-bold text-indigo-400 text-sm">{cartCount} items</span>
            </div>
            {cartCount > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-400 hover:text-rose-300 underline font-semibold"
              >
                Clear Cart
              </button>
            )}
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

        {/* Event Grid: EventCard reads context directly without drilled props! */}
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
              <EventCard key={event.id} event={event} />
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
