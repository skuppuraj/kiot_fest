import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEvents,
  setDepartment,
  setSearchQuery,
  selectAllEvents,
  selectDepartmentFilter,
  selectSearchQuery,
  selectEventsStatus,
  resetFilters,
} from '../redux/slices/eventSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const selectedDept = useSelector(selectDepartmentFilter);
  const searchQuery = useSelector(selectSearchQuery);
  const status = useSelector(selectEventsStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents({ department: selectedDept, search: searchQuery }));
    }
  }, [dispatch, status, selectedDept, searchQuery]);

  const departments = ['ALL', 'CSE', 'ECE', 'AI&DS', 'MECH'];

  const filteredEvents = events.filter(e => {
    const matchDept = selectedDept === 'ALL' || e.department === selectedDept;
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col justify-between">
      <Head>
        <title>KIOT FEST 2026 | Redux Async Thunks</title>
        <meta name="description" content="Managing async API lifecycle with Redux createAsyncThunk" />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Hero Section */}
        <section className="text-center py-10 border-b border-slate-800/80 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
            Unit 4 — Step 11
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 font-outfit">
            Redux Async Thunks & API Lifecycle
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm sm:text-base leading-relaxed">
            Data fetching dispatched via <code className="text-indigo-300 font-mono">createAsyncThunk(&apos;events/fetchEvents&apos;)</code>. 
            Redux automatically tracks <code className="text-amber-300 font-mono">pending</code>, <code className="text-emerald-300 font-mono">fulfilled</code>, and <code className="text-rose-300 font-mono">rejected</code> lifecycle actions.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold">
            <span className={`w-2 h-2 rounded-full ${status === 'loading' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
            <span className="text-slate-300">Thunk Status:</span>
            <span className="text-indigo-400 font-bold uppercase">{status}</span>
          </div>
        </section>

        {/* Search & Department Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search workshops and hackathons..."
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
          />

          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => dispatch(setDepartment(dept))}
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

        {/* Event Grid / Loading Skeletons */}
        {status === 'loading' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <LoadingSkeleton key={n} />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <p className="text-lg font-bold text-slate-300">No Events Found matching &quot;{searchQuery}&quot;</p>
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
