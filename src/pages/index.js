import React from 'react';
import Head from 'next/head';

export default function WhyHtmlPage() {
  return (
    <div style={{ fontFamily: 'Times New Roman, serif', padding: '24px', maxWidth: '900px', margin: '0 auto', color: '#000000', backgroundColor: '#ffffff', lineHeight: 1.5 }}>
      <Head>
        <title>Unit 0: Step 1 - Why HTML? | KIOT Fest 2026</title>
      </Head>

      {/* Educational Banner */}
      <div style={{ border: '2px dashed #b91c1c', padding: '16px', marginBottom: '24px', backgroundColor: '#fef2f2' }}>
        <h2 style={{ marginTop: 0, color: '#991b1b' }}>🦴 UNIT 0: STEP 1 - WHY HTML? (THE SKELETON)</h2>
        <p>
          <strong>The Core Question:</strong> <em>"Why do we need HTML? What happens if you build a website with only pure semantic HTML?"</em>
        </p>
        <p>
          <strong>What you see below:</strong> The complete KIOT Fest portal rendered using <strong>100% pure semantic HTML5</strong> (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;table&gt;</code>, <code>&lt;form&gt;</code>) with <strong>ZERO CSS styling</strong>.
        </p>
        <ul>
          <li>Notice the browser user-agent defaults: serif font (Times New Roman), standard blue links, unstyled form buttons, black-and-white layout.</li>
          <li><strong>Why it matters:</strong> HTML provides the semantic hierarchy and accessibility tree required by screen readers and search crawlers.</li>
          <li><strong>The Limitation:</strong> It looks like 1991! Elements stack vertically, without responsive grids, colors, typography, or branding.</li>
        </ul>
        <p>
          👉 <strong>Direct file access:</strong> You can also open <code>index.html</code> directly in your browser!
        </p>
        <p style={{ marginBottom: 0 }}>
          👉 <strong>Next Checkpoint:</strong> Run <code>git checkout preschool-02-why-css</code> to see how CSS dresses up this exact HTML!
        </p>
      </div>

      {/* Semantic Header */}
      <header>
        <h1 style={{ fontSize: '2.2em', marginBottom: '4px' }}>Knowledge Institute of Technology (KIOT)</h1>
        <h2 style={{ fontSize: '1.4em', marginTop: 0, fontWeight: 'normal' }}>Department of Computer Science & Engineering</h2>
        <h3 style={{ fontSize: '1.2em' }}>KIOT FEST 2026 - Annual National Technical Symposium</h3>
        <p><em>Theme: Innovation, Fullstack Engineering & Sustainable Computing | Date: October 15-16, 2026</em></p>
        <hr />
        <nav>
          <strong>Navigation:</strong> |{' '}
          <a href="#events">Symposium Events</a> |{' '}
          <a href="#schedule">Rounds & Schedule</a> |{' '}
          <a href="#register">Student Registration</a> |{' '}
          <a href="#contact">Coordinator Contact</a> |{' '}
          <span>Selected Events: <strong>0</strong> | Total: <strong>₹0</strong></span>
        </nav>
        <hr />
      </header>

      {/* Main Content Area */}
      <main>
        <section id="announcement">
          <h3>📢 Symposium Announcement</h3>
          <p>
            Registrations are officially open for all accredited engineering institutions across India. Cash prizes worth <strong>₹50,000</strong> to be won across technical domains.
          </p>
        </section>

        <hr />

        <section id="events">
          <h2>Featured Symposium Events</h2>

          <article>
            <h3>1. Web Hackathon 2026</h3>
            <p><strong>Department:</strong> Computer Science & Engineering</p>
            <p><strong>Description:</strong> Build fullstack web applications using modern JavaScript and React in a 6-hour intense coding sprint.</p>
            <ul>
              <li>Team Size: 2-3 Members</li>
              <li>Cash Prize: ₹15,000</li>
              <li>Registration Fee: ₹200 per team</li>
            </ul>
            <button type="button">Select Event for Registration</button>
          </article>

          <hr />

          <article>
            <h3>2. Circuit Debugging Master</h3>
            <p><strong>Department:</strong> Electronics & Communication Engineering</p>
            <p><strong>Description:</strong> PCB trace fault-finding, microcontroller assembly routines, and embedded hardware debugging.</p>
            <ul>
              <li>Team Size: 1-2 Members</li>
              <li>Cash Prize: ₹8,000</li>
              <li>Registration Fee: ₹100 per person</li>
            </ul>
            <button type="button">Select Event for Registration</button>
          </article>

          <hr />

          <article>
            <h3>3. AI Prompt & Model Challenge</h3>
            <p><strong>Department:</strong> Artificial Intelligence & Data Science</p>
            <p><strong>Description:</strong> Build generative AI workflows, optimize domain model prompts, and construct fast RAG pipelines.</p>
            <ul>
              <li>Team Size: 2 Members</li>
              <li>Cash Prize: ₹12,000</li>
              <li>Registration Fee: ₹150 per team</li>
            </ul>
            <button type="button">Select Event for Registration</button>
          </article>
        </section>

        <hr />

        <section id="schedule">
          <h2>Event Schedule & Timings</h2>
          <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
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

        <hr />

        <section id="register">
          <h2>Student Registration Form</h2>
          <form action="#" method="POST">
            <fieldset>
              <legend>Student Personal Details</legend>
              <p>
                <label htmlFor="studentName">Full Name (as per College ID):</label><br />
                <input type="text" id="studentName" name="studentName" required placeholder="e.g. John Doe" />
              </p>
              <p>
                <label htmlFor="rollNumber">Register / Roll Number:</label><br />
                <input type="text" id="rollNumber" name="rollNumber" required placeholder="e.g. 731521104001" />
              </p>
              <p>
                <label htmlFor="dept">Department:</label><br />
                <select id="dept" name="dept">
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="AIDS">Artificial Intelligence & Data Science</option>
                </select>
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
        <address>NH-544, Kakapalayam, Salem - 637 504, Tamil Nadu, India.</address>
        <p>Contact Email: <a href="mailto:kiotfest@kiot.ac.in">kiotfest@kiot.ac.in</a> | Phone: +91 427 2433900</p>
        <p><small>&copy; 2026 KIOT CSE Department. All Rights Reserved.</small></p>
      </footer>
    </div>
  );
}
