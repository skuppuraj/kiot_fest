import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { getAllEvents } from '../lib/db';

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      initialEvents: events || [],
      generatedAt: new Date().toISOString()
    },
    revalidate: 30 // ISR
  };
}

export default function HomePage({ initialEvents, generatedAt }) {
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
        <title>KIOT FEST 2026 | Fullstack APIs & Dual-Mode DB</title>
        <meta name="description" content="Next.js Fullstack API routes and resilient dual-mode database driver" />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Hero Section */}
        <section className="text-center py-12 border-b border-slate-800/80 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
            Unit 5 — Step 15
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white mt-4 font-outfit tracking-tight">
            Next.js API Routes & MySQL Driver
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base leading-relaxed">
            Fullstack serverless endpoints (<code className="text-indigo-300 font-mono">/api/events</code>, <code className="text-indigo-300 font-mono">/api/register</code>) backed by our resilient dual-mode driver.
            Connects to MySQL connection pools when available, with automatic mock store fallback!
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
              🗄️ Driver Status: <strong className="text-emerald-400">Resilient Mode Active</strong>
            </span>
          </div>
        </section>

        {/* Search and Filters */}
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

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
