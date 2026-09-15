import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import EventFilters from '../components/EventFilters';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEvents,
  selectAllEvents,
  selectDepartmentFilter,
  selectCategoryFilter,
  selectSearchQuery,
  selectEventsStatus,
  resetFilters,
} from '../redux/slices/eventSlice';
import { selectCartCount } from '../redux/slices/cartSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const selectedDept = useSelector(selectDepartmentFilter);
  const selectedCat = useSelector(selectCategoryFilter);
  const searchQuery = useSelector(selectSearchQuery);
  const status = useSelector(selectEventsStatus);
  const cartCount = useSelector(selectCartCount);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents({ department: selectedDept, search: searchQuery }));
    }
  }, [dispatch, status, selectedDept, searchQuery]);

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
        <title>KIOT FEST 2026 | Redux DevTools & Persistence</title>
        <meta name="description" content="Redux DevTools time travel and localStorage state synchronization" />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Hero Section */}
        <section className="text-center py-10 border-b border-slate-800/80 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
            Unit 4 — Step 12
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 font-outfit">
            Redux DevTools & LocalStorage Persistence
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base leading-relaxed">
            State is persisted across page refreshes via <code className="text-indigo-300 font-mono">store.subscribe()</code> and localStorage. 
            Open Chrome DevTools to inspect time-travel action replays and state diffs!
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Persisted Cart Items:</span>
            <span className="text-amber-400 font-bold">{cartCount} items</span>
          </div>
        </section>

        {/* Reusable EventFilters Component */}
        <EventFilters />

        {/* Event Grid / Loading Skeletons */}
        {status === 'loading' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <LoadingSkeleton key={n} />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <p className="text-lg font-bold text-slate-300">No Events Found matching your criteria</p>
            <button
              onClick={() => dispatch(resetFilters())}
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
