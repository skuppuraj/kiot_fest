import React from 'react';

/**
 * UNIT 3 - STEP 1: REACT SETUP & THE MONOLITHIC JSX PROBLEM
 * 
 * 🔴 THE PROBLEM:
 * All event cards are copy-pasted in a single monolithic file.
 * There are no reusable components, no dynamic props, and no state.
 * Changing the card design requires updating 20 separate HTML blocks!
 */
export default function HomePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto text-white">
      <div className="border-b border-slate-800 pb-6 mb-8">
        <span className="text-xs font-bold px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">
          Unit 3: Step 1 Demo
        </span>
        <h1 className="text-3xl font-black mt-2">KIOT FEST 2026 (Monolithic JSX)</h1>
        <p className="text-slate-400 text-sm mt-1">
          Problem: Notice how the code below duplicates HTML structure for every event card!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hardcoded Event Card 1 */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300">CSE</span>
          <h2 className="text-xl font-bold mt-2">Web Hackathon 2026</h2>
          <p className="text-sm text-slate-400 mt-1">Build fullstack web applications using React in 6 hours.</p>
          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
            <span className="font-bold text-amber-300">Prize: ₹15,000</span>
            <button className="px-4 py-2 bg-indigo-600 rounded-xl text-white font-bold text-xs">Register (₹200)</button>
          </div>
        </div>

        {/* Hardcoded Event Card 2 (Duplicate Structure) */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300">ECE</span>
          <h2 className="text-xl font-bold mt-2">Circuit Debugging Master</h2>
          <p className="text-sm text-slate-400 mt-1">PCB and embedded microcontroller debugging challenge.</p>
          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
            <span className="font-bold text-amber-300">Prize: ₹8,000</span>
            <button className="px-4 py-2 bg-indigo-600 rounded-xl text-white font-bold text-xs">Register (₹100)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
