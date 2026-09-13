import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectLastGeneratedPass } from '../redux/slices/cartSlice';
import TicketPass from '../components/TicketPass';
import {
  Ticket,
  Search,
  Loader2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function MyTicketsPage() {
  const lastPass = useSelector(selectLastGeneratedPass);
  const [rollNo, setRollNo] = useState(lastPass?.roll_no || '');
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (lastPass && lastPass.roll_no) {
      fetchTickets(lastPass.roll_no);
    }
  }, [lastPass]);

  const fetchTickets = async (searchRoll) => {
    if (!searchRoll.trim()) {
      setErrorMsg('Please enter your college roll number.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setHasSearched(true);

    try {
      const res = await fetch(`/api/my-tickets?roll_no=${encodeURIComponent(searchRoll.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch tickets.');
      }

      setTickets(data);
    } catch (err) {
      setErrorMsg(err.message || 'Unable to retrieve tickets.');
      setTickets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTickets(rollNo);
  };

  return (
    <>
      <Head>
        <title>My Registered Passes | KIOT FEST 2026</title>
        <meta
          name="description"
          content="View, print and download your official KIOT Fest 2026 digital QR ticket passes."
        />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Ticket className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital QR Checkpoint Passes</span>
          </div>
          <h1 className="fluid-section-title font-black text-white">Find Your Fest Passes</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Enter your college roll number below to retrieve and print all your registered event tickets.
          </p>
        </div>

        {/* Search Roll Number Box */}
        <div className="fest-glass rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl max-w-xl mx-auto mb-10 no-print">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Enter Student Roll Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="e.g. 22CS001 or 22CS045"
                  className="w-full pl-4 pr-10 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 uppercase font-mono font-bold text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-glow-primary transition flex items-center justify-center space-x-2 touch-target"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching Passes...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Lookup Registration Passes</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Roll No Tip */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500">
              Try pre-seeded roll number:{' '}
              <button
                type="button"
                onClick={() => {
                  setRollNo('22CS001');
                  fetchTickets('22CS001');
                }}
                className="text-indigo-400 font-mono font-bold hover:underline"
              >
                22CS001
              </button>
            </p>
          </div>
        </div>

        {/* Results Section */}
        {isLoading ? (
          <div className="text-center py-12 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400 mx-auto" />
            <p className="text-xs text-slate-400">Querying registered passes database...</p>
          </div>
        ) : tickets.length > 0 ? (
          <div className="space-y-6">
            <div className="text-center mb-6 no-print">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                Found {tickets.length} Registered Pass(es)
              </span>
            </div>

            {tickets.map((ticket) => (
              <TicketPass key={ticket.id || ticket.ticket_code} ticket={ticket} />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="text-center py-16 fest-glass rounded-3xl border border-slate-800 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <Ticket className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No Passes Found for &quot;{rollNo}&quot;</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn&apos;t find any active registrations for this roll number. Register for exciting competitions now!
            </p>
            <Link
              href="/events"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-glow-primary touch-target"
            >
              <span>Browse Fest Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}
