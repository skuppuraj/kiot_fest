import React, { useState } from 'react';
import Head from 'next/head';

const EVENTS = [
  {
    id: 1,
    title: '1. Web Hackathon 2026',
    dept: 'Computer Science & Engineering',
    desc: 'Build fullstack web applications using modern JavaScript and React in a 6-hour intense coding sprint.',
    teamSize: '2 to 3 Members',
    prize: '₹15,000',
    fee: 200,
    feeUnit: 'per team',
    eligibility: 'All B.E / B.Tech students',
  },
  {
    id: 2,
    title: '2. Circuit Debugging Master',
    dept: 'Electronics & Communication Engineering',
    desc: 'Trace faults on hardware PCBs, decode microcontroller assembly routines, and repair circuit tracks.',
    teamSize: 'Individual or 2 Members',
    prize: '₹8,000',
    fee: 100,
    feeUnit: 'per person',
    tools: 'Digital Multimeters, Oscilloscopes, Soldering Station',
  },
  {
    id: 3,
    title: '3. AI Prompt & Model Challenge',
    dept: 'Artificial Intelligence & Data Science',
    desc: 'Optimize LLM prompts, build RAG pipelines, and fine-tune mini models on domain data.',
    teamSize: '2 Members',
    prize: '₹12,000',
    fee: 150,
    feeUnit: 'per team',
  },
];

function EventCard({ event, isSelected, onToggle }) {
  return (
    <article data-id={event.id} data-fee={event.fee}>
      <h3>{event.title}</h3>
      <p><strong>Department:</strong> {event.dept}</p>
      <p><strong>Description:</strong> {event.desc}</p>
      <ul>
        <li>Team Size: {event.teamSize}</li>
        <li>Cash Prize: {event.prize}</li>
        <li data-fee={event.fee}>Entry Fee: ₹{event.fee} {event.feeUnit}</li>
        {event.tools && <li>Tools Provided: {event.tools}</li>}
        {event.eligibility && <li>Eligibility: {event.eligibility}</li>}
      </ul>
      <button
        type="button"
        data-id={event.id}
        data-fee={event.fee}
        onClick={() => onToggle(event.id)}
        className={isSelected ? 'selected' : ''}
      >
        {isSelected ? 'Selected ✓' : 'Select Event for Registration'}
      </button>
    </article>
  );
}

export default function WhyReactJsPage() {
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
    const item = EVENTS.find((e) => e.id === id);
    return sum + (item ? item.fee : 0);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('🎉 Registration Submitted Successfully for ' + (fullName || 'Student') + '!\nSelected Events: ' + selectedIds.length + '\nTotal Fee: ₹' + totalAmount);
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
    <div>
      <Head>
        <title>KIOT FEST 2026 - Annual National Technical Symposium</title>
      </Head>

      <header>
        <h1>Knowledge Institute of Technology</h1>
        <h2>Department of Computer Science &amp; Engineering</h2>
        <h3>KIOT FEST 2026 - Annual National Technical Symposium</h3>
        <p><em>The ultimate battleground for student coders, circuit designers, and innovators.</em></p>
        <hr />
        <nav>
          <strong>Quick Navigation:</strong> |{' '}
          <a href="#events">Explore Events</a> |{' '}
          <a href="#schedule">Schedule &amp; Rounds</a> |{' '}
          <a href="#register">Student Registration Form</a> |{' '}
          <a href="#contact">Contact Coordinators</a> |{' '}
          <span id="cart-status">
            Selected Events: <strong id="cart-count">{selectedIds.length}</strong> | Total: <strong id="cart-total">₹{totalAmount}</strong>
          </span>
        </nav>
        <hr />
      </header>

      <main>
        <section id="announcement">
          <h3>📢 Symposium Announcement</h3>
          <p>
            Registration is now open for all affiliated engineering colleges. Cash prizes worth{' '}
            <strong>₹50,000</strong> to be won across technical and non-technical rounds.
          </p>
        </section>

        <hr />

        <section id="events">
          <h2>Featured Symposium Events</h2>
          {EVENTS.map((event, index) => (
            <React.Fragment key={event.id}>
              {index > 0 && <hr />}
              <EventCard
                event={event}
                isSelected={selectedIds.includes(event.id)}
                onToggle={toggleEvent}
              />
            </React.Fragment>
          ))}
        </section>

        <hr />

        <section id="schedule">
          <h2>Event Schedule &amp; Timings</h2>
          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th>Time Slot</th>
                <th>Event Name</th>
                <th>Venue / Lab</th>
                <th>Coordinator</th>
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
                <td>AI Model Challenge</td>
                <td>AI&amp;DS Cloud Lab (4th Floor)</td>
                <td>Dr. M. Suresh (Ext. 505)</td>
              </tr>
              <tr>
                <td>03:30 PM - 04:30 PM</td>
                <td>Valedictory &amp; Prize Distribution</td>
                <td>KIOT Main Auditorium</td>
                <td>Principal &amp; HODs</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr />

        <section id="register">
          <h2>Student Registration Form</h2>
          <form action="#" method="POST" onSubmit={handleSubmit} onReset={handleReset}>
            <fieldset>
              <legend>Student Personal Details</legend>
              <p>
                <label htmlFor="fullName">Full Name (as on College ID):</label><br />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="rollNo">Register / Roll Number:</label><br />
                <input
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  required
                  placeholder="e.g. 731521104001"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="college">College Name:</label><br />
                <input
                  type="text"
                  id="college"
                  name="college"
                  required
                  placeholder="e.g. Knowledge Institute of Technology"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="email">College / Personal Email:</label><br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="student@kiot.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="dept">Department:</label><br />
                <select id="dept" name="dept" value={dept} onChange={(e) => setDept(e.target.value)}>
                  <option value="CSE">Computer Science &amp; Engineering</option>
                  <option value="ECE">Electronics &amp; Communication</option>
                  <option value="AIDS">Artificial Intelligence &amp; Data Science</option>
                  <option value="MECH">Mechanical Engineering</option>
                  <option value="IT">Information Technology</option>
                </select>
              </p>
              <p>
                <label>Accommodation Required?</label><br />
                <input
                  type="radio"
                  id="acc_yes"
                  name="accommodation"
                  value="yes"
                  checked={accommodation === 'yes'}
                  onChange={(e) => setAccommodation(e.target.value)}
                />
                <label htmlFor="acc_yes" style={{ display: 'inline', marginLeft: '6px', marginRight: '16px' }}>Yes (Hostel Room)</label>
                <input
                  type="radio"
                  id="acc_no"
                  name="accommodation"
                  value="no"
                  checked={accommodation === 'no'}
                  onChange={(e) => setAccommodation(e.target.value)}
                />
                <label htmlFor="acc_no" style={{ display: 'inline', marginLeft: '6px' }}>No (Day Scholar / Local)</label>
              </p>
              <p>
                <button type="submit">Submit Registration</button>{' '}
                <button type="reset">Clear Form</button>
              </p>
            </fieldset>
          </form>
        </section>
      </main>

      <hr />

      <footer id="contact">
        <p><strong>Knowledge Institute of Technology (KIOT)</strong></p>
        <p>NH-544, Kakapalayam, Salem - 637 504, Tamil Nadu, India.</p>
        <p>Contact Email: <a href="mailto:kiotfest@kiot.ac.in">kiotfest@kiot.ac.in</a> | Phone: +91 427 2433900</p>
        <p><small>&copy; 2026 KIOT CSE Department. All Rights Reserved.</small></p>
      </footer>
    </div>
  );
}
