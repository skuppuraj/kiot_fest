import React, { useState } from 'react';
import Head from 'next/head';

const EVENTS = [
  { id: 1, title: 'Web Hackathon 2026', dept: 'CSE', fee: 200, prize: '₹15,000', desc: 'Build fullstack web applications using React in 6 hours.' },
  { id: 2, title: 'Circuit Debugging Master', dept: 'ECE', fee: 100, prize: '₹8,000', desc: 'PCB trace fault-finding and microcontroller firmware debugging.' },
  { id: 3, title: 'AI Prompt Challenge', dept: 'AIDS', fee: 150, prize: '₹12,000', desc: 'Construct prompt engineering pipelines and fine-tune mini domain models.' }
];

export default function WhyVanillaJsPage() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [displayCount, setDisplayCount] = useState(0);
  const [displayTotal, setDisplayTotal] = useState(0);
  const [isDesyncMode, setIsDesyncMode] = useState(false);

  const handleToggle = (event) => {
    const exists = selectedIds.includes(event.id);
    const next = exists ? selectedIds.filter(id => id !== event.id) : [...selectedIds, event.id];
    setSelectedIds(next);

    if (isDesyncMode && !exists) {
      // Simulate Vanilla JS developer forgetting one manual DOM update!
    } else {
      setDisplayCount(next.length);
      const sum = next.reduce((acc, id) => {
        const item = EVENTS.find(e => e.id === id);
        return acc + (item ? item.fee : 0);
      }, 0);
      setDisplayTotal(sum);
    }
  };

  const hasDesyncBug = isDesyncMode && selectedIds.length !== displayCount;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px' }}>
      <Head>
        <title>Unit 0: Step 3 - Why Vanilla JS? | KIOT Fest 2026</title>
      </Head>

      {/* Educational Banner */}
      <div style={{ backgroundColor: '#1e293b', border: '2px solid #10b981', borderRadius: '16px', padding: '20px', marginBottom: '24px', color: '#f8fafc' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              ⚡ Unit 0: Step 3
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>Why Vanilla JS? (Interactivity & The DOM Hell)</h2>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => {
                setIsDesyncMode(!isDesyncMode);
                if (isDesyncMode) {
                  setDisplayCount(selectedIds.length);
                  setDisplayTotal(selectedIds.reduce((acc, id) => acc + (EVENTS.find(e => e.id === id)?.fee || 0), 0));
                }
              }}
              style={{ backgroundColor: isDesyncMode ? '#e11d48' : '#334155', color: '#ffffff', fontSize: '0.75rem', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer' }}
            >
              {isDesyncMode ? '⚠️ Desync Bug: ACTIVE' : '⚡ Simulate Vanilla JS Bug'}
            </button>
            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#6ee7b7', backgroundColor: '#0f172a', padding: '6px 12px', borderRadius: '8px', border: '1px solid #334155' }}>
              $ git checkout preschool-04-why-reactjs
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: '8px 0' }}>
          Using <strong>Native JS (script.js)</strong>, we attach event listeners to the existing HTML+CSS. Clicking &quot;Select Event&quot; updates the cart count and total price in real time!
        </p>

        {hasDesyncBug && (
          <div style={{ backgroundColor: '#450a0a', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px', borderRadius: '10px', marginTop: '12px', fontSize: '0.85rem' }}>
            <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>💥 STATE DESYNCHRONIZATION DETECTED!</p>
            <p style={{ margin: 0 }}>
              Actual in-memory data state: <strong>{selectedIds.length} events</strong> | UI Cart Display: <strong>{displayCount} events</strong>.
              In Vanilla JS, missing just ONE manual <code>document.getElementById</code> query causes the visual UI to lie to the user!
            </p>
          </div>
        )}
      </div>

      {/* Semantic Header */}
      <header>
        <h1>Knowledge Institute of Technology (KIOT)</h1>
        <h2>Department of Computer Science & Engineering</h2>
        <h3>KIOT FEST 2026 - Annual National Technical Symposium</h3>
        <hr />
        <nav>
          <strong>Navigation:</strong>
          <a href="#events">Symposium Events</a>
          <a href="#schedule">Rounds & Schedule</a>
          <a href="#register">Student Registration</a>
          <span id="cart-status" style={{ backgroundColor: hasDesyncBug ? '#e11d48' : 'rgba(99, 102, 241, 0.2)' }}>
            Selected Events: <strong id="cart-count">{displayCount}</strong> | Total: <strong id="cart-total">₹{displayTotal}</strong>
          </span>
        </nav>
      </header>

      {/* Main Content Area */}
      <main>
        <section id="events">
          <h2>Featured Symposium Events (Interactive via Native JS)</h2>
          <div className="events-grid">
            {EVENTS.map(event => {
              const isSelected = selectedIds.includes(event.id);
              return (
                <article key={event.id}>
                  <div>
                    <h3>{event.title}</h3>
                    <p><strong>Department:</strong> {event.dept}</p>
                    <p>{event.desc}</p>
                    <ul>
                      <li>Cash Prize: {event.prize}</li>
                      <li>Registration Fee: ₹{event.fee}</li>
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle(event)}
                    className={isSelected ? 'selected' : ''}
                  >
                    {isSelected ? 'Selected ✓' : 'Select Event for Registration'}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section id="register">
          <h2>Student Registration Form</h2>
          <form action="#" method="POST" onSubmit={(e) => { e.preventDefault(); alert('Registration Submitted! Selected: ' + selectedIds.length + ' events, Total: ₹' + displayTotal); }}>
            <fieldset>
              <legend>Student Personal Details</legend>
              <p>
                <label htmlFor="studentName">Full Name:</label>
                <input type="text" id="studentName" required placeholder="e.g. John Doe" />
              </p>
              <p>
                <label htmlFor="rollNumber">Register Number:</label>
                <input type="text" id="rollNumber" required placeholder="e.g. 731521104001" />
              </p>
              <p>
                <button type="submit">Submit Registration</button>
              </p>
            </fieldset>
          </form>
        </section>
      </main>

      <footer>
        <p>Knowledge Institute of Technology (KIOT) — Salem, Tamil Nadu.</p>
      </footer>
    </div>
  );
}
