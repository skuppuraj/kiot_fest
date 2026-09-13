import React, { useState } from 'react';
import Head from 'next/head';

export default function WhyCssPage() {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px' }}>
      <Head>
        <title>Unit 0: Step 2 - Why CSS? | KIOT Fest 2026</title>
      </Head>

      {/* Educational Banner */}
      <div style={{ backgroundColor: '#1e293b', border: '2px solid #6366f1', borderRadius: '16px', padding: '20px', marginBottom: '24px', color: '#f8fafc' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              🎨 Unit 0: Step 2
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>Why CSS Comes Into Play? (The Presentation Layer)</h2>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#a5b4fc', backgroundColor: '#0f172a', padding: '6px 12px', borderRadius: '8px', border: '1px solid #334155' }}>
            $ git checkout preschool-03-why-vanilla-js
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: '8px 0' }}>
          <strong>Notice: The HTML below is 100% IDENTICAL to Step 1!</strong> We did not change a single HTML tag. CSS styles the existing tags via the <strong>Box Model</strong>, <strong>CSS Grid</strong> (cards), and <strong>Flexbox</strong> (navbar).
        </p>

        <div style={{ backgroundColor: '#0f172a', padding: '12px 16px', borderRadius: '12px', border: '1px solid #334155', marginTop: '12px', fontSize: '0.85rem' }}>
          <p style={{ color: '#f59e0b', fontWeight: 'bold', margin: '0 0 4px 0' }}>⚠️ The "Static Wall" of CSS:</p>
          <p style={{ color: '#94a3b8', margin: 0 }}>
            Click "Select Event for Registration" below. CSS looks modern, but it has no brain. It cannot calculate totals or store cart data!
          </p>
        </div>
      </div>

      {showWarning && (
        <div style={{ backgroundColor: '#450a0a', border: '1px solid #ef4444', color: '#fca5a5', padding: '14px', borderRadius: '12px', marginBottom: '24px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            🛑 <strong>CSS CANNOT STORE STATE!</strong> Notice that clicking the button does not increment the cart counter or save data. CSS is purely visual presentation. <strong>We need JavaScript for interactivity!</strong>
          </span>
          <button onClick={() => setShowWarning(false)} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#fca5a5', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}>
            Dismiss
          </button>
        </div>
      )}

      {/* Semantic Header */}
      <header>
        <h1>Knowledge Institute of Technology (KIOT)</h1>
        <h2>Department of Computer Science & Engineering</h2>
        <h3>KIOT FEST 2026 - Annual National Technical Symposium</h3>
        <p>Theme: Innovation, Fullstack Engineering & Sustainable Computing | Date: October 15-16, 2026</p>
        <hr />
        <nav>
          <strong>Navigation:</strong>
          <a href="#events">Symposium Events</a>
          <a href="#schedule">Rounds & Schedule</a>
          <a href="#register">Student Registration</a>
          <a href="#contact">Coordinator Contact</a>
          <span id="cart-status">Selected Events: <strong>0</strong> | Total: <strong>₹0</strong></span>
        </nav>
      </header>

      {/* Main Content Area */}
      <main>
        <section id="announcement">
          <h3>📢 Symposium Announcement</h3>
          <p>Registrations are officially open. Cash prizes worth ₹50,000 to be won across 3 technical domains.</p>
        </section>

        <section id="events">
          <h2>Featured Symposium Events (Styled via CSS Grid)</h2>
          <div className="events-grid">
            <article>
              <div>
                <h3>1. Web Hackathon 2026</h3>
                <p><strong>Department:</strong> CSE</p>
                <p>Build fullstack web applications using React in 6 hours.</p>
                <ul>
                  <li>Team Size: 2-3 Members</li>
                  <li>Cash Prize: ₹15,000</li>
                  <li>Registration Fee: ₹200</li>
                </ul>
              </div>
              <button type="button" onClick={() => setShowWarning(true)}>Select Event for Registration</button>
            </article>

            <article>
              <div>
                <h3>2. Circuit Debugging Master</h3>
                <p><strong>Department:</strong> ECE</p>
                <p>PCB trace fault-finding and microcontroller firmware debugging.</p>
                <ul>
                  <li>Team Size: 1-2 Members</li>
                  <li>Cash Prize: ₹8,000</li>
                  <li>Registration Fee: ₹100</li>
                </ul>
              </div>
              <button type="button" onClick={() => setShowWarning(true)}>Select Event for Registration</button>
            </article>

            <article>
              <div>
                <h3>3. AI Prompt Challenge</h3>
                <p><strong>Department:</strong> AI&DS</p>
                <p>Construct prompt engineering pipelines and fine-tune mini domain models.</p>
                <ul>
                  <li>Team Size: 2 Members</li>
                  <li>Cash Prize: ₹12,000</li>
                  <li>Registration Fee: ₹150</li>
                </ul>
              </div>
              <button type="button" onClick={() => setShowWarning(true)}>Select Event for Registration</button>
            </article>
          </div>
        </section>

        <section id="schedule">
          <h2>Event Schedule & Timings</h2>
          <table>
            <thead>
              <tr>
                <th>Time Slot</th>
                <th>Event Name</th>
                <th>Venue / Lab</th>
                <th>Faculty Coordinator</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>09:30 AM - 12:30 PM</td>
                <td>Web Hackathon (Round 1)</td>
                <td>CSE Turing Lab (3rd Floor)</td>
                <td>Prof. K. Raj (Ext. 402)</td>
              </tr>
              <tr>
                <td>10:00 AM - 12:00 PM</td>
                <td>Circuit Debugging</td>
                <td>ECE Micro Lab (2nd Floor)</td>
                <td>Prof. S. Priya (Ext. 214)</td>
              </tr>
              <tr>
                <td>01:30 PM - 03:30 PM</td>
                <td>AI Prompt Challenge</td>
                <td>AI&DS Cloud Lab (4th Floor)</td>
                <td>Dr. M. Suresh (Ext. 505)</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="register">
          <h2>Student Registration Form</h2>
          <form action="#" method="POST" onSubmit={(e) => { e.preventDefault(); setShowWarning(true); }}>
            <fieldset>
              <legend>Student Personal Details</legend>
              <p>
                <label htmlFor="studentName">Full Name:</label>
                <input type="text" id="studentName" placeholder="e.g. John Doe" />
              </p>
              <p>
                <label htmlFor="rollNumber">Register Number:</label>
                <input type="text" id="rollNumber" placeholder="e.g. 731521104001" />
              </p>
              <p>
                <label htmlFor="dept">Department:</label>
                <select id="dept">
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="AIDS">Artificial Intelligence & Data Science</option>
                </select>
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
