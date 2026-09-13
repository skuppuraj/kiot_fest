import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { PRESCHOOL_EVENTS, SCHEDULE_DATA } from '../data/preschoolEvents';

export async function getServerSideProps(context) {
  // Executed on the Node.js server for every request before delivering HTML
  // Server-side API fetch to the same /api/events endpoint:
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const host = context.req.headers['host'] || 'localhost:3000';
  const apiUrl = `${protocol}://${host}/api/events`;

  let serverTimestamp = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  let initialEvents = PRESCHOOL_EVENTS;
  let initialSchedule = SCHEDULE_DATA;

  try {
    const res = await fetch(apiUrl);
    if (res.ok) {
      const data = await res.json();
      serverTimestamp = data.serverTimestamp || serverTimestamp;
      initialEvents = data.events || PRESCHOOL_EVENTS;
      initialSchedule = data.schedule || SCHEDULE_DATA;
    }
  } catch (err) {
    // If the server cannot reach itself via HTTP loopback, fall back cleanly to data constants
    console.warn('Server-side fetch to /api/events note:', err.message);
  }

  return {
    props: {
      serverTimestamp,
      initialEvents,
      initialSchedule,
    },
  };
}

export default function NextJsSsrPage({ serverTimestamp, initialEvents, initialSchedule }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [fullName, setFullName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [college, setCollege] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('CSE');
  const [accommodation, setAccommodation] = useState('no');

  const toggleEvent = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalAmount = selectedIds.reduce((sum, id) => {
    const item = (initialEvents || []).find((e) => e.id === id);
    return sum + (item ? item.fee : 0);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `🎉 Registration Submitted Successfully for ${fullName || 'Student'}!\nSelected Events: ${selectedIds.length}\nTotal Fee: ₹${totalAmount}`
    );
  };

  const handleReset = () => {
    setSelectedIds([]);
    setFullName('');
    setRollNo('');
    setCollege('');
    setEmail('');
    setDept('CSE');
    setAccommodation('no');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-10 font-sans">
      <Head>
        <title>KIOT FEST 2026 | Next.js SSR (Server-Side Pre-rendered)</title>
        <meta name="description" content="Annual National Technical Symposium. Pre-rendered on server for instant first paint and SEO." />
        <meta property="og:title" content="KIOT FEST 2026 - Annual National Technical Symposium" />
        <meta property="og:description" content="Cash prizes worth ₹50,000. Register now for Web Hackathon, Circuit Debugging, and AI Challenge." />
        <meta property="og:image" content="https://kiotfest.com/poster.jpg" />
      </Head>

      {/* Top Architecture Status Bar */}
      <div className="max-w-5xl mx-auto mb-6 p-4 bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Architecture: Next.js Server-Side Rendering (SSR)
              </span>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                getServerSideProps (Server API Fetch)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Pre-rendered on Server via <code className="text-emerald-300 font-mono">GET /api/events</code> at <strong className="text-emerald-300 font-mono">{serverTimestamp}</strong> • Zero client-side API requests!
            </p>
          </div>
        </div>

        <Link
          href="/pure-react"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition shadow-md hover:shadow-rose-600/30"
        >
          <span>⚡ Switch to Pure React CSR (/pure-react)</span>
          <span>➔</span>
        </Link>
      </div>

      {/* Main Symposium Portal Container */}
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Knowledge Institute of Technology
            </h1>
            <h2 className="text-base md:text-lg font-bold text-indigo-400">
              Department of Computer Science &amp; Engineering
            </h2>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-200">
              KIOT FEST 2026 - Annual National Technical Symposium
            </h3>
            <p className="text-sm text-slate-400 italic">
              The ultimate battleground for student coders, circuit designers, and innovators.
            </p>
          </div>

          <hr className="border-slate-800" />

          {/* Navigation Bar */}
          <nav className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-3 font-semibold text-cyan-400">
              <span className="text-slate-500 font-normal">Quick Navigation:</span>
              <a href="#events" className="hover:text-cyan-300 hover:underline">Explore Events</a>
              <span className="text-slate-700">|</span>
              <a href="#schedule" className="hover:text-cyan-300 hover:underline">Schedule &amp; Rounds</a>
              <span className="text-slate-700">|</span>
              <a href="#register" className="hover:text-cyan-300 hover:underline">Registration Form</a>
              <span className="text-slate-700">|</span>
              <a href="#contact" className="hover:text-cyan-300 hover:underline">Coordinators</a>
            </div>

            <div id="cart-status" className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-bold text-xs">
              Selected Events: <strong id="cart-count" className="text-white">{selectedIds.length}</strong> | Total: <strong id="cart-total" className="text-amber-300">₹{totalAmount}</strong>
            </div>
          </nav>
        </header>

        {/* Announcement Section */}
        <section id="announcement" className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-2 shadow-lg">
          <h3 className="text-base font-bold text-amber-400 flex items-center space-x-2">
            <span>📢 Symposium Announcement</span>
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Registration is now open for all affiliated engineering colleges across India. Cash prizes worth{' '}
            <strong className="text-white font-bold underline decoration-amber-400 underline-offset-4">₹50,000</strong>{' '}
            to be won across technical and non-technical rounds.
          </p>
        </section>

        {/* Events Grid Section */}
        <section id="events" className="p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Featured Symposium Events</h2>
              <p className="text-xs text-slate-400">Pre-rendered directly by Next.js server; available in raw HTML payload.</p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg">
              ✓ Server Pre-rendered
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(initialEvents || []).map((event) => {
              const isSelected = selectedIds.includes(event.id);
              return (
                <article
                  key={event.id}
                  data-id={event.id}
                  data-fee={event.fee}
                  className="p-6 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-2xl flex flex-col justify-between space-y-4 transition shadow-md"
                >
                  <div className="space-y-2">
                    <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-[10px] font-bold uppercase">
                      {event.dept}
                    </span>
                    <h3 className="text-base font-bold text-white">{event.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{event.desc}</p>
                    <ul className="text-xs text-slate-300 space-y-1 pt-2 border-t border-slate-800/80">
                      <li>• Team Size: {event.teamSize}</li>
                      <li>• Cash Prize: <strong className="text-amber-300">{event.prize}</strong></li>
                      <li data-fee={event.fee}>• Entry Fee: ₹{event.fee} {event.feeUnit}</li>
                      {event.tools && <li>• Tools: {event.tools}</li>}
                      {event.eligibility && <li>• Eligibility: {event.eligibility}</li>}
                    </ul>
                  </div>

                  <button
                    type="button"
                    data-id={event.id}
                    data-fee={event.fee}
                    onClick={() => toggleEvent(event.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition shadow ${
                      isSelected
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {isSelected ? 'Selected ✓' : 'Select Event for Registration'}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">
            Event Schedule &amp; Timings
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-indigo-400 uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4">Time Slot</th>
                  <th className="py-3 px-4">Event Name</th>
                  <th className="py-3 px-4">Venue / Lab</th>
                  <th className="py-3 px-4">Coordinator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {(initialSchedule || []).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-4 font-mono text-slate-400">{row.time}</td>
                    <td className="py-3 px-4 font-bold text-white">{row.name}</td>
                    <td className="py-3 px-4">{row.venue}</td>
                    <td className="py-3 px-4 text-slate-400">{row.coordinator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Registration Form */}
        <section id="register" className="p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">
            Student Registration Form
          </h2>

          <form action="#" method="POST" onSubmit={handleSubmit} onReset={handleReset} className="space-y-4">
            <fieldset className="border border-slate-800 rounded-2xl p-6 space-y-4">
              <legend className="px-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Student Personal Details
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="space-y-1">
                  <label htmlFor="fullName" className="block text-xs font-semibold text-slate-400">
                    Full Name (as on College ID):
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder="e.g. John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </p>

                <p className="space-y-1">
                  <label htmlFor="rollNo" className="block text-xs font-semibold text-slate-400">
                    Register / Roll Number:
                  </label>
                  <input
                    type="text"
                    id="rollNo"
                    name="rollNo"
                    required
                    placeholder="e.g. 731521104001"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="space-y-1">
                  <label htmlFor="college" className="block text-xs font-semibold text-slate-400">
                    College Name:
                  </label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    required
                    placeholder="e.g. Knowledge Institute of Technology"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </p>

                <p className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-400">
                    College / Personal Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="student@kiot.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </p>
              </div>

              <p className="space-y-1 max-w-sm">
                <label htmlFor="dept" className="block text-xs font-semibold text-slate-400">
                  Department:
                </label>
                <select
                  id="dept"
                  name="dept"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="CSE">Computer Science &amp; Engineering</option>
                  <option value="ECE">Electronics &amp; Communication</option>
                  <option value="AIDS">Artificial Intelligence &amp; Data Science</option>
                  <option value="MECH">Mechanical Engineering</option>
                  <option value="IT">Information Technology</option>
                </select>
              </p>

              <div className="space-y-2 pt-2">
                <span className="block text-xs font-semibold text-slate-400">Accommodation Required?</span>
                <div className="flex items-center space-x-6 text-xs text-slate-300">
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      id="acc_yes"
                      name="accommodation"
                      value="yes"
                      checked={accommodation === 'yes'}
                      onChange={(e) => setAccommodation(e.target.value)}
                      className="text-indigo-600 focus:ring-0"
                    />
                    <span>Yes (Hostel Room)</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      id="acc_no"
                      name="accommodation"
                      value="no"
                      checked={accommodation === 'no'}
                      onChange={(e) => setAccommodation(e.target.value)}
                      className="text-indigo-600 focus:ring-0"
                    />
                    <span>No (Day Scholar / Local)</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow"
                >
                  Submit Registration
                </button>
                <button
                  type="reset"
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                >
                  Clear Form
                </button>
              </div>
            </fieldset>
          </form>
        </section>

        {/* Footer */}
        <footer id="contact" className="p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-2 text-xs text-slate-400 shadow-xl">
          <p className="text-sm font-bold text-white">Knowledge Institute of Technology (KIOT)</p>
          <address className="not-italic text-slate-400">NH-544, Kakapalayam, Salem - 637 504, Tamil Nadu, India.</address>
          <p>
            Contact Email: <a href="mailto:kiotfest@kiot.ac.in" className="text-cyan-400 hover:underline">kiotfest@kiot.ac.in</a> | Phone: +91 427 2433900
          </p>
          <p className="text-[11px] text-slate-500 pt-2">&copy; 2026 KIOT CSE Department. All Rights Reserved.</p>
        </footer>

        {/* DevTools Demonstration Guide Card */}
        <div className="p-6 bg-slate-900/60 border border-indigo-500/30 rounded-3xl space-y-3 text-xs">
          <h4 className="text-sm font-bold text-indigo-400 flex items-center space-x-2">
            <span>🛠️ How to Demonstrate This in Browser DevTools:</span>
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 leading-relaxed">
            <li>
              <strong>View Page Source (<code className="text-emerald-400 font-mono">Cmd+Option+U</code> / <code className="text-emerald-400 font-mono">Ctrl+U</code>):</strong> Notice that all event titles, cash prizes, dates, and tables are <strong>100% present in the initial HTML</strong>! Social media crawlers and Googlebot can index it instantly.
            </li>
            <li>
              <strong>Disable JavaScript (<code className="text-emerald-400 font-mono">DevTools &gt; Settings (F1) &gt; Disable JavaScript</code>):</strong> Reload the page. The symposium site still renders completely! Then open <code className="text-rose-400 font-mono">/pure-react</code> to see the difference.
            </li>
            <li>
              <strong>Network Throttling (<code className="text-emerald-400 font-mono">DevTools &gt; Network &gt; Fast 3G</code>):</strong> Reload this page. The First Contentful Paint (FCP) is nearly instantaneous because the server already delivered ready HTML!
            </li>
            <li>
              <strong>Zero API Waterfall (<code className="text-emerald-400 font-mono">DevTools &gt; Network &gt; Fetch/XHR</code>):</strong> Filter requests by <strong>Fetch/XHR</strong>. Notice that <strong>0 network requests</strong> are made by the browser to load events! Then visit <code className="text-rose-400 font-mono">/pure-react</code> to see the client-side <code className="text-rose-400 font-mono">GET /api/events</code> roundtrip.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
