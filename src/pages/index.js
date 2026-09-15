import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { getMockEvents } from '../lib/mockData';

export async function getStaticProps() {
  const events = getMockEvents();

  return {
    props: {
      initialEvents: events,
      generatedAt: new Date().toISOString()
    },
    revalidate: 60 // ISR: Revalidate static page every 60s
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
        <title>KIOT FEST 2026 | SSG & ISR Rendering</title>
        <meta name="description" content="Next.js Static Site Generation with Incremental Static Regeneration" />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Hero Section */}
        <section className="text-center py-12 border-b border-slate-800/80 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
            Unit 5 — Step 14
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white mt-4 font-outfit tracking-tight">
            SSG, ISR & SSR Data Fetching
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base leading-relaxed">
            This page was pre-rendered at build time with <code className="text-indigo-300 font-mono">getStaticProps</code> and is served from the edge in &lt; 20ms.
            Incremental Static Regeneration updates the HTML in the background every 60 seconds!
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
              ⚡ Edge Cached • Generated: <strong className="text-indigo-400">{new Date(generatedAt).toLocaleTimeString()}</strong>
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
