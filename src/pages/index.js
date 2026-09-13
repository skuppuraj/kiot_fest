import React, { useState } from 'react';
import Navbar from '../components/Navbar';

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
              <div key={event.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">{event.department}</span>
                    {event.seatsLeft === 0 ? (
                      <span className="text-xs font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">🔴 SOLD OUT</span>
                    ) : (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">🟢 {event.seatsLeft} Seats Left</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mt-2">{event.title}</h3>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-amber-400 font-bold">{event.prize}</span>
                  {event.seatsLeft === 0 ? (
                    <button disabled className="px-4 py-2 bg-slate-800 text-slate-500 rounded-xl text-xs font-bold cursor-not-allowed">
                      Closed
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold">
                      Register (₹{event.fee})
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
