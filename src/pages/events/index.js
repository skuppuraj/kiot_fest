import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import EventCard from '../../components/EventCard';
import RegistrationModal from '../../components/RegistrationModal';
import { ALL_EVENTS } from '../../data/events';

export default function EventsCatalogPage() {
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalEvent, setModalEvent] = useState(null);

  const filteredEvents = ALL_EVENTS.filter(e => {
    const matchDept = selectedDept === 'ALL' || e.department === selectedDept;
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <>
      <Head>
        <title>All Competitions | KIOT FEST 2026</title>
      </Head>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 text-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Link href="/" className="text-xs text-slate-400 hover:text-indigo-400 mb-2 inline-block">
              ← Return Home
            </Link>
            <h1 className="text-3xl font-black">All Competitions & Workshops</h1>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm"
          />
          <select 
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm"
          >
            <option value="ALL">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="AI&DS">AI&DS</option>
            <option value="MECH">MECH</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onQuickRegister={(evt) => setModalEvent(evt)}
            />
          ))}
        </div>
      </div>

      {modalEvent && (
        <RegistrationModal
          event={modalEvent}
          onClose={() => setModalEvent(null)}
          onSuccess={() => {
            alert(`Successfully registered for ${modalEvent.title}!`);
            setModalEvent(null);
          }}
        />
      )}
    </>
  );
}
