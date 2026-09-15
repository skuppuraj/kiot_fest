import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import EventCard from '../components/EventCard';
import { getAllEvents } from '../lib/db';

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      initialEvents: events || [],
      generatedAt: new Date().toISOString()
    },
    revalidate: 30
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
        <title>KIOT FEST 2026 | Cross-Device & Browser Compatibility</title>
        <meta name="description" content="Responsive design with dynamic viewport units, clamp typography and mobile touch targets" />
      </Head>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1 w-full">
        {/* Responsive Hero Banner with Countdown Timer */}
        <HeroBanner />

        {/* Section Divider */}
        <div className="border-t border-slate-800/80 my-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Featured Competitions & Workshops
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Engineered with touch-friendly cards and adaptive responsive layouts
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 min-h-[44px]"
              />

              <div className="flex flex-wrap gap-1.5">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition min-h-[44px] ${
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
          </div>

          {/* Event Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
