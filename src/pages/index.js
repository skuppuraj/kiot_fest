import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import EventFilters from '../components/EventFilters';
import { useSelector } from 'react-redux';
import {
  selectAllEvents,
  selectDepartmentFilter,
  selectCategoryFilter,
  selectSearchQuery
} from '../redux/slices/eventSlice';

export default function HomePage() {
  const events = useSelector(selectAllEvents);
  const selectedDept = useSelector(selectDepartmentFilter);
  const selectedCat = useSelector(selectCategoryFilter);
  const searchQuery = useSelector(selectSearchQuery);

  const filteredEvents = events.filter(e => {
    const matchDept = selectedDept === 'ALL' || e.department === selectedDept;
    const matchCat = selectedCat === 'ALL' || e.category === selectedCat;
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col justify-between">
      <Head>
        <title>KIOT FEST 2026 | Next.js Architecture & File-Based Routing</title>
        <meta name="description" content="File-based routing with Next.js Pages router, _document.js custom fonts, and reusable Footer layout" />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Hero Section */}
        <section className="text-center py-12 border-b border-slate-800/80 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
            Unit 5 — Step 13
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white mt-4 font-outfit tracking-tight">
            Next.js Architecture & Routing
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base leading-relaxed">
            Every file in <code className="text-indigo-300 font-mono">pages/</code> is automatically a live route! 
            Experience instant client-side route transitions between <code className="text-amber-300 font-mono">/</code> and <code className="text-amber-300 font-mono">/events/[id]</code> with zero layout thrashing.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/events"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition"
            >
              Explore Events Catalog (/events) →
            </Link>
          </div>
        </section>

        {/* Reusable EventFilters */}
        <EventFilters />

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
