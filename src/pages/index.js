import React from 'react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';

const SAMPLE_EVENTS = [
  { id: 1, title: 'Web Hackathon 2026', department: 'CSE', description: 'Build innovative web apps.', prize: '₹15,000', fee: 200, date: 'March 25, 2026' },
  { id: 2, title: 'Circuit Debugging', department: 'ECE', description: 'Embedded PCB debugging.', prize: '₹8,000', fee: 100, date: 'March 25, 2026' },
  { id: 3, title: 'GenAI Masterclass', department: 'AI&DS', description: 'Hands-on LLM workshop.', prize: 'Certificates', fee: 350, date: 'March 26, 2026' },
  { id: 4, title: 'Robo Wars', department: 'MECH', description: 'Combat robotics battle.', prize: '₹25,000', fee: 300, date: 'March 26, 2026' }
];

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-2">Flagship Competitions</h1>
        <p className="text-slate-400 text-sm mb-6">Rendered cleanly using reusable &lt;EventCard /&gt; with Props mapping!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_EVENTS.map(event => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}
