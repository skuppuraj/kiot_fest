import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import RegistrationModal from '../components/RegistrationModal';

const ALL_EVENTS = [
  { id: 1, title: 'Web Hackathon 2026', department: 'CSE', description: 'Build innovative web apps.', prize: '₹15,000', fee: 200, seatsLeft: 5 },
  { id: 2, title: 'Circuit Debugging', department: 'ECE', description: 'Embedded PCB debugging.', prize: '₹8,000', fee: 100, seatsLeft: 12 },
  { id: 3, title: 'GenAI Masterclass', department: 'AI&DS', description: 'Hands-on LLM workshop.', prize: 'Certificates', fee: 350, seatsLeft: 8 },
  { id: 4, title: 'Robo Wars', department: 'MECH', description: 'Combat robotics battle.', prize: '₹25,000', fee: 300, seatsLeft: 0 }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [registeredCount, setRegisteredCount] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeredSuccess, setRegisteredSuccess] = useState(null);

  const filteredEvents = ALL_EVENTS.filter(e => {
    const matchDept = selectedDept === 'ALL' || e.department === selectedDept;
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto text-white">
        {/* Header with Title & Live Registration Badge */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-black">Interactive Event Finder</h1>
            <p className="text-slate-400 text-xs mt-1">Unit 3 — Step 5: Controlled Forms & Validation</p>
          </div>
          <div className="bg-indigo-600/20 border border-indigo-500/40 px-4 py-2 rounded-xl text-sm font-bold text-indigo-300">
            🎟️ Registered: {registeredCount}
          </div>
        </div>

        {registeredSuccess && (
          <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-sm flex justify-between items-center">
            <span>🎉 Successfully registered {registeredSuccess.name} ({registeredSuccess.rollNo}) for {registeredSuccess.event}!</span>
            <button onClick={() => setRegisteredSuccess(null)} className="text-emerald-400 hover:text-white font-bold ml-4">✕</button>
          </div>
        )}

        {/* Real-time Controlled Search Input */}
        <div className="mb-4">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to filter events in real time..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Department Filter Pills with Conditional Active Styling */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['ALL', 'CSE', 'ECE', 'AI&DS', 'MECH'].map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedDept === dept 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Conditional Rendering: Empty State vs Event Cards Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <p className="text-lg font-bold text-slate-300">No Events Found for "{searchQuery}"</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedDept('ALL'); }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map(event => (
              <EventCard 
                key={event.id} 
                {...event} 
                onRegister={() => setSelectedEvent(event)} 
              />
            ))}
          </div>
        )}

        {/* Controlled Registration Form Modal */}
        {selectedEvent && (
          <RegistrationModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onSuccess={(formData) => {
              setRegisteredCount(prev => prev + 1);
              setRegisteredSuccess({ ...formData, event: selectedEvent.title });
              setSelectedEvent(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
