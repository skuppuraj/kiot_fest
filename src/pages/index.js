import React from 'react';

/**
 * ============================================================================
 * KIOT FEST 2026 - WORKSHOP STARTER KIT (DEV SETUP)
 * Target Audience: 3rd Year CSE Students
 * ============================================================================
 * 
 * Welcome to the KIOT Fest Fullstack Web Development Workshop!
 * Environment: React 18, Next.js, Tailwind CSS.
 * 
 * 🚀 To begin Step 1 (Monolithic JSX vs Components), checkout branch:
 *    git checkout 01-react-setup-and-jsx
 */
export default function StarterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-white">
      <div className="max-w-xl w-full p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-6 shadow-2xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold">
          <span>✨ 2-Day College Workshop Starter</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white">
          KIOT FEST 2026
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Your development environment is ready with Tailwind CSS, Next.js, and Workshop Materials!
        </p>
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 font-mono text-left space-y-1">
          <p className="text-slate-500">// Next Step for Students:</p>
          <p className="text-indigo-400 font-bold">$ git checkout 01-react-setup-and-jsx</p>
        </div>
      </div>
    </div>
  );
}
