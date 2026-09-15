import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import RegistrationModal from '../../components/RegistrationModal';
import { ALL_EVENTS } from '../../data/events';

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [showModal, setShowModal] = useState(false);

  // When static pre-rendering without router query
  if (!id) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading competition details...</p>
      </div>
    );
  }

  const event = ALL_EVENTS.find(e => String(e.id) === String(id));

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <div className="max-w-4xl mx-auto p-12 text-center">
          <h2 className="text-2xl font-bold">Event #{id} Not Found</h2>
          <p className="text-slate-400 text-sm mt-2">The competition you are looking for does not exist.</p>
          <Link href="/events" className="text-indigo-400 mt-6 inline-block font-bold">
            ← Return to All Events
          </Link>
        </div>
      </div>
    );
  }

  const isSoldOut = event.seatsLeft === 0;

  return (
    <>
      <Head>
        <title>{event.title} | KIOT FEST 2026</title>
      </Head>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 text-white">
        <Link href="/events" className="text-xs text-slate-400 hover:text-indigo-400 inline-block mb-6">
          ← Back to All Competitions
        </Link>
        
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <span className="text-xs font-bold px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">
                {event.department}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black mt-3">{event.title}</h1>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-amber-400 block">{event.prize}</span>
              {isSoldOut ? (
                <span className="text-xs font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded inline-block mt-1">
                  🔴 SOLD OUT
                </span>
              ) : (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded inline-block mt-1">
                  🟢 {event.seatsLeft} Seats Available
                </span>
              )}
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            {event.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs">
            <div className="bg-slate-800/40 p-4 rounded-xl">
              <span className="text-slate-400 block mb-1">Registration Fee</span>
              <span className="text-lg font-bold text-white">₹{event.fee}</span>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl">
              <span className="text-slate-400 block mb-1">Seats Remaining</span>
              <span className="text-lg font-bold text-white">{event.seatsLeft}</span>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl">
              <span className="text-slate-400 block mb-1">Date</span>
              <span className="text-lg font-bold text-white">{event.date}</span>
            </div>
          </div>

          <div className="pt-4">
            {isSoldOut ? (
              <button disabled className="w-full py-3 bg-slate-800 text-slate-500 rounded-xl font-bold cursor-not-allowed">
                Registrations Closed
              </button>
            ) : (
              <button 
                onClick={() => setShowModal(true)}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition shadow-lg shadow-indigo-600/30"
              >
                Register Now (₹{event.fee})
              </button>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <RegistrationModal
          event={event}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            alert(`Registration confirmed for ${event.title}!`);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
