import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';

const ALL_EVENTS = [
  { id: 1, title: 'Web Hackathon 2026', department: 'CSE', prize: '₹15,000', fee: 200, seatsLeft: 5 },
  { id: 2, title: 'Circuit Debugging', department: 'ECE', prize: '₹8,000', fee: 100, seatsLeft: 12 },
  { id: 3, title: 'GenAI Masterclass', department: 'AI&DS', prize: 'Certificates', fee: 350, seatsLeft: 8 },
  { id: 4, title: 'Robo Wars', department: 'MECH', prize: '₹25,000', fee: 300, seatsLeft: 0 }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const filteredEvents = ALL_EVENTS.filter(e => {
    const matchDept = selectedDept === 'ALL' || e.department === selectedDept;
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto text-white">
        <h1 className="text-3xl font-black mb-6">KIOT FEST 2026 (Conditional Rendering)</h1>

        <div className="flex gap-2 mb-6">
          {['ALL', 'CSE', 'ECE', 'AI&DS', 'MECH'].map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedDept === dept ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <p className="text-lg font-bold text-slate-300">No Events Found for "{searchQuery}"</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedDept('ALL'); }}
              className="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
