import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ALL_EVENTS = [
  { id: 1, title: 'Web Hackathon 2026', department: 'CSE', description: 'Build innovative web apps.', prize: '₹15,000', fee: 200, seatsLeft: 5 },
  { id: 2, title: 'Circuit Debugging', department: 'ECE', description: 'Embedded PCB debugging.', prize: '₹8,000', fee: 100, seatsLeft: 12 },
  { id: 3, title: 'GenAI Masterclass', department: 'AI&DS', description: 'Hands-on LLM workshop.', prize: 'Certificates', fee: 350, seatsLeft: 20 },
  { id: 4, title: 'Robo Wars', department: 'MECH', description: 'Combat robotics battle.', prize: '₹25,000', fee: 300, seatsLeft: 0 }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [registeredCount, setRegisteredCount] = useState(0);

  const filteredEvents = ALL_EVENTS.filter(e => {
    const matchDept = selectedDept === 'ALL' || e.department === selectedDept;
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-black">Interactive Event Finder</h1>
            <p className="text-slate-400 text-xs mt-1">Powered by React useState & Synthetic Events</p>
          </div>
          <div className="bg-indigo-600/20 border border-indigo-500/40 px-4 py-2 rounded-xl text-sm font-bold text-indigo-300">
            🎟️ Registered: {registeredCount}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to filter events in real time..."
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
          {filteredEvents.map(event => (
            <div key={event.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">{event.department}</span>
                <h3 className="text-xl font-bold mt-2">{event.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{event.description}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-amber-400 font-bold">Prize: {event.prize}</span>
                <button 
                  onClick={() => setRegisteredCount(prev => prev + 1)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold"
                >
                  Quick Register (₹{event.fee})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
