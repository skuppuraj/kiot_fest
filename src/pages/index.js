import React, { useState } from 'react';
import Head from 'next/head';

export default function WhyTailwindPage() {
  const [viewMode, setViewMode] = useState('tailwind');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <Head>
        <title>Unit 0: Step 5 - Why Tailwind CSS? | KIOT Fest 2026</title>
      </Head>

      {/* Educational Banner */}
      <div className="max-w-6xl mx-auto mb-8 p-6 bg-slate-900 border border-indigo-500/30 rounded-3xl shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
              🎨 Unit 0: Step 5
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white">Why CSS to Tailwind? (Solving Native CSS Problems)</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode('tailwind')}
              className={viewMode === 'tailwind' ? 'px-3 py-1.5 rounded-xl text-xs font-bold transition bg-indigo-600 text-white' : 'px-3 py-1.5 rounded-xl text-xs font-bold transition bg-slate-800 text-slate-400'}
            >
              Tailwind Utility
            </button>
            <button
              onClick={() => setViewMode('native')}
              className={viewMode === 'native' ? 'px-3 py-1.5 rounded-xl text-xs font-bold transition bg-indigo-600 text-white' : 'px-3 py-1.5 rounded-xl text-xs font-bold transition bg-slate-800 text-slate-400'}
            >
              Native CSS BEM
            </button>
            <div className="font-mono text-xs text-indigo-300 bg-indigo-950/50 px-3 py-1.5 rounded-lg border border-indigo-800/40">
              $ git checkout preschool-06-why-nextjs
            </div>
          </div>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          In large teams, Native CSS causes <strong>class naming fatigue (BEM hell)</strong>, <strong>global specificity collisions</strong>, and <strong>dead CSS code bloat</strong>. Tailwind CSS solves all 5 difficulties using standardized design tokens and build-time purging!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <p className="text-indigo-400 font-bold mb-1">1. Zero Naming Fatigue</p>
            <p className="text-slate-400">Never invent names like .kiot-fest__card-title--active again.</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <p className="text-emerald-400 font-bold mb-1">2. Zero CSS Bloat</p>
            <p className="text-slate-400">Tailwind purges unused CSS. Production bundle is &lt; 15 KB!</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <p className="text-cyan-400 font-bold mb-1">3. Design Tokens</p>
            <p className="text-slate-400">Standardized spacing (p-4, p-6) and curated harmonious palettes.</p>
          </div>
        </div>
      </div>

      {/* Code Comparison */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-mono text-xs">
        <div className="p-5 bg-slate-900 border border-rose-900/40 rounded-2xl space-y-2 text-rose-300">
          <p className="font-bold text-rose-400">// ❌ Native CSS: Separate file + BEM naming:</p>
          <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed text-slate-300">
{`/* In style.css (Line 340): */
.kiot-fest-card {
  padding: 24px;
  background: #0f172a;
  border-radius: 16px;
  border: 1px solid #334155;
}
.kiot-fest-card__title {
  color: #ffffff;
  font-size: 18px;
}`}
          </pre>
        </div>

        <div className="p-5 bg-slate-900 border border-emerald-900/40 rounded-2xl space-y-2 text-emerald-300">
          <p className="font-bold text-emerald-400">// ✅ Tailwind CSS: Colocated Design Tokens:</p>
          <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed text-slate-300">
{`/* Right in your component JSX: */
<div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
  <h3 className="text-lg font-bold text-white">
    Web Hackathon 2026
  </h3>
</div>`}
          </pre>
        </div>
      </div>

      {/* Card Render */}
      <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
        <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-bold">CSE</span>
        <h3 className="text-xl font-bold text-white">Web Hackathon 2026</h3>
        <p className="text-xs text-slate-400 leading-relaxed">Build fullstack web applications using React in a 6-hour sprint.</p>
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
          <span className="text-sm font-bold text-amber-300">Prize: ₹15,000</span>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition">
            Register (₹200)
          </button>
        </div>
      </div>
    </div>
  );
}
