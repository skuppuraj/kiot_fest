import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EventCard from '../../components/EventCard';
import { getMockEvents } from '../../lib/mockData';

export async function getStaticProps() {
  const events = getMockEvents();

  return {
    props: {
      initialEvents: events,
      generatedAt: new Date().toISOString()
    },
    revalidate: 60 // ISR: Regenerate static catalog in background every 60s
  };
}

export default function EventsCatalogPage({ initialEvents, generatedAt }) {
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const departments = ['ALL', 'CSE', 'ECE', 'AI&DS', 'MECH'];

  const filteredEvents = (initialEvents || []).filter((e) => {
    const matchDept = selectedDept === 'ALL' || e.department === selectedDept;
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col justify-between">
      <Head>
        <title>Event Catalog (SSG + ISR) | KIOT FEST 2026</title>
        <meta name="description" content="Pre-rendered static event catalog with Incremental Static Regeneration" />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10 flex-1 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <Link href="/" className="text-xs text-slate-400 hover:text-indigo-400 mb-2 inline-block">
              ← Return Home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              All Competitions & Workshops
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Pre-rendered at: <code className="text-indigo-300 font-mono" suppressHydrationWarning>{new Date(generatedAt).toLocaleTimeString()}</code> (SSG + ISR 60s)
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by keyword..."
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

        {/* Event Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <p className="text-lg font-bold text-slate-300">No Events Found matching your search</p>
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

      <Footer />
    </div>
  );
}
