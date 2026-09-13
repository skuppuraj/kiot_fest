const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function run(cmd) {
  console.log(`[EXEC] ${cmd}`);
  execSync(cmd, { cwd: ROOT_DIR, stdio: 'inherit' });
}

function writeFile(relPath, content) {
  const fullPath = path.join(ROOT_DIR, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
}

function removePath(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
}

// 1. Checkout main first to ensure we backup the full complete app
run('git checkout main');

// 2. Backup current final code to a temporary directory
const TEMP_BACKUP = path.join(ROOT_DIR, '.kiot_final_backup');
console.log('📦 Backing up complete master code...');
removePath('.kiot_final_backup');
fs.cpSync(path.join(ROOT_DIR, 'src'), path.join(TEMP_BACKUP, 'src'), { recursive: true });
fs.cpSync(path.join(ROOT_DIR, 'workshop_materials'), path.join(TEMP_BACKUP, 'workshop_materials'), { recursive: true });
fs.cpSync(path.join(ROOT_DIR, 'database'), path.join(TEMP_BACKUP, 'database'), { recursive: true });
if (fs.existsSync(path.join(ROOT_DIR, 'public'))) {
  fs.cpSync(path.join(ROOT_DIR, 'public'), path.join(TEMP_BACKUP, 'public'), { recursive: true });
}

function restoreFromBackup(relPath) {
  const src = path.join(TEMP_BACKUP, relPath);
  const dest = path.join(ROOT_DIR, relPath);
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
  }
}

const branchList = [
  'preschool-01-why-html',
  'preschool-02-why-css',
  'preschool-03-why-vanilla-js',
  'preschool-04-why-reactjs',
  'preschool-05-native-css-to-tailwind',
  'preschool-06-why-nextjs',
  'devsetup',
  '01-react-setup-and-jsx',
  '02-components-and-props',
  '03-state-and-event-handling',
  '04-conditional-rendering',
  '05-controlled-forms-validation',
  '06-useeffect-and-api-integration',
  '07-react-router-spa',
  '08-prop-drilling-problem',
  '09-usecontext-and-limitations',
  '10-redux-toolkit-store-and-cart-slice',
  '11-redux-async-thunk-events',
  '12-redux-devtools-and-persistence',
  '13-nextjs-setup-file-routing',
  '14-nextjs-ssg-and-ssr',
  '15-nextjs-api-and-mysql',
  '16-cross-device-and-browser-compatibility',
  '17-image-optimization-and-seo',
  '18-final-project-and-vercel-deploy'
];

try {
  run('git checkout -B temp_build_branch');
} catch (e) {}

for (const b of branchList) {
  try {
    run(`git branch -D ${b}`);
  } catch (e) {}
}

function commitStep(msg) {
  run(`git add . && (git commit -m "${msg}" || true)`);
}

// ============================================================================
// STEP PRE-01: Branch preschool-01-why-html (Why HTML?)
// ============================================================================
console.log('\n🌿 Building Branch: preschool-01-why-html (Why HTML?)');
run('git checkout --orphan preschool-01-why-html');
removePath('src');
removePath('database');
removePath('style.css');
removePath('script.js');
restoreFromBackup('workshop_materials');
restoreFromBackup('public');

// 1. Root index.html using the master semantic HTML template
const masterHtml = fs.readFileSync(path.join(ROOT_DIR, 'public/preschool/raw_html_demo.html'), 'utf8');
writeFile('index.html', masterHtml);

// 2. Next.js pages for npm run dev
writeFile('src/pages/_app.js', `import React from 'react';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
`);

writeFile('src/pages/index.js', `import React from 'react';
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
`);

commitStep('feat(preschool-01): demonstrate raw semantic HTML5 structure, tags hierarchy and default browser rendering');

// ============================================================================
// STEP PRE-02: Branch preschool-02-why-css (Why CSS Comes Into Play?)
// ============================================================================
console.log('\n🌿 Building Branch: preschool-02-why-css (Why CSS Comes Into Play?)');
run('git checkout -b preschool-02-why-css');

// 1. Copy native CSS stylesheet
const nativeCss = fs.readFileSync(path.join(ROOT_DIR, 'public/preschool/style.css'), 'utf8');
writeFile('style.css', nativeCss);
writeFile('src/styles/native_style.css', nativeCss);

// 2. Link CSS in index.html - Notice the HTML markup is 100% UNCHANGED!
const htmlWithCss = masterHtml.replace('</head>', '  <link rel="stylesheet" href="style.css">\n</head>');
writeFile('index.html', htmlWithCss);

writeFile('src/pages/_app.js', `import React from 'react';
import '../styles/native_style.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
`);

writeFile('src/pages/index.js', `import React, { useState } from 'react';
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
`);

commitStep('feat(preschool-02): demonstrate Native CSS presentation layer, Box Model, Flex/Grid layouts, and the static limitation on the same HTML');

// ============================================================================
// STEP PRE-03: Branch preschool-03-why-vanilla-js (Why Vanilla JS?)
// ============================================================================
console.log('\n🌿 Building Branch: preschool-03-why-vanilla-js (Why Vanilla JS?)');
run('git checkout -b preschool-03-why-vanilla-js');

// 1. Copy native script.js
const nativeJs = fs.readFileSync(path.join(ROOT_DIR, 'public/preschool/script.js'), 'utf8');
writeFile('script.js', nativeJs);

// 2. Link script in index.html - HTML and CSS remain 100% UNCHANGED!
const htmlWithJs = htmlWithCss.replace('</body>', '  <script src="script.js"></script>\n</body>');
writeFile('index.html', htmlWithJs);

writeFile('src/pages/index.js', `import React, { useState } from 'react';
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
`);

commitStep('feat(preschool-03): demonstrate Native Vanilla JS DOM manipulation, event listeners, and the imperative state desync crisis');

// ============================================================================
// STEP PRE-04: Branch preschool-04-why-reactjs (Why React.js?)
// ============================================================================
console.log('\n🌿 Building Branch: preschool-04-why-reactjs (Why React.js?)');
run('git checkout -b preschool-04-why-reactjs');

writeFile('src/pages/index.js', `import React, { useState } from 'react';
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
    alert('🎉 Registration Submitted Successfully for ' + (fullName || 'Student') + '!\\nSelected Events: ' + selectedIds.length + '\\nTotal Fee: ₹' + totalAmount);
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
`);

commitStep('feat(preschool-04): demonstrate why React.js solves Vanilla JS difficulties with declarative state, reusable components, and Virtual DOM');

// ============================================================================
// STEP PRE-05: Branch preschool-05-native-css-to-tailwind (Why CSS to Tailwind?)
// ============================================================================
console.log('\n🌿 Building Branch: preschool-05-native-css-to-tailwind (Why CSS to Tailwind?)');
run('git checkout -b preschool-05-native-css-to-tailwind');

writeFile('src/styles/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0a0f1d;
  color: #ffffff;
  font-family: system-ui, -apple-system, sans-serif;
}
`);

writeFile('src/pages/_app.js', `import React from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
`);

writeFile('src/pages/index.js', `import React, { useState } from 'react';
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
{\`/* In style.css (Line 340): */
.kiot-fest-card {
  padding: 24px;
  background: #0f172a;
  border-radius: 16px;
  border: 1px solid #334155;
}
.kiot-fest-card__title {
  color: #ffffff;
  font-size: 18px;
}\`}
          </pre>
        </div>

        <div className="p-5 bg-slate-900 border border-emerald-900/40 rounded-2xl space-y-2 text-emerald-300">
          <p className="font-bold text-emerald-400">// ✅ Tailwind CSS: Colocated Design Tokens:</p>
          <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed text-slate-300">
{\`/* Right in your component JSX: */
<div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
  <h3 className="text-lg font-bold text-white">
    Web Hackathon 2026
  </h3>
</div>\`}
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
`);

commitStep('feat(preschool-05): demonstrate how Tailwind CSS solves Native CSS class naming fatigue, global specificity collisions, and dead code bloat');

// ============================================================================
// STEP PRE-06: Branch preschool-06-why-nextjs (Why Next.js?)
// ============================================================================
console.log('\n🌿 Building Branch: preschool-06-why-nextjs (Why Next.js?)');
run('git checkout -b preschool-06-why-nextjs');

// Setup Route 1 (SSR at /), Route 2 (Pure React CSR at /pure-react), and mock API route at /api/events
fs.mkdirSync(path.join(ROOT_DIR, 'src/data'), { recursive: true });
fs.mkdirSync(path.join(ROOT_DIR, 'src/pages/api'), { recursive: true });
fs.copyFileSync(path.join(ROOT_DIR, 'public/preschool/preschoolEvents.js'), path.join(ROOT_DIR, 'src/data/preschoolEvents.js'));
fs.copyFileSync(path.join(ROOT_DIR, 'public/preschool/ssr_index.js'), path.join(ROOT_DIR, 'src/pages/index.js'));
fs.copyFileSync(path.join(ROOT_DIR, 'public/preschool/pure_react.js'), path.join(ROOT_DIR, 'src/pages/pure-react.js'));
fs.copyFileSync(path.join(ROOT_DIR, 'public/preschool/api_events.js'), path.join(ROOT_DIR, 'src/pages/api/events.js'));

commitStep('feat(preschool-06): demonstrate Next.js SSR vs Pure React CSR using route-based comparison (/ vs /pure-react) and real mock API endpoint (/api/events)');

// ============================================================================
// STEP 0: Branch devsetup (Clean Developer Environment Setup)
// ============================================================================
console.log('\n🌿 Building Branch: devsetup (Clean Dev Setup)');
run('git checkout --orphan devsetup');
removePath('src');
removePath('database');
removePath('style.css');
removePath('script.js');
restoreFromBackup('workshop_materials');
restoreFromBackup('public');

writeFile('src/pages/_app.js', `import React from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
`);

writeFile('src/styles/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0a0f1d;
  color: #ffffff;
  font-family: system-ui, -apple-system, sans-serif;
}
`);

writeFile('src/pages/index.js', `import React from 'react';

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
`);

commitStep('feat(devsetup): clean developer environment setup with Tailwind CSS & workshop materials');

// ============================================================================
// STEP 1: Branch 01-react-setup-and-jsx
// ============================================================================
console.log('\n🌿 Building Branch: 01-react-setup-and-jsx');
run('git checkout -b 01-react-setup-and-jsx');

writeFile('src/pages/index.js', `import React from 'react';

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
`);

commitStep('feat(01): React environment setup & monolithic JSX problem demonstration');

// ============================================================================
// STEP 2: Branch 02-components-and-props
// ============================================================================
console.log('\n🌿 Building Branch: 02-components-and-props');
run('git checkout -b 02-components-and-props');

writeFile('src/components/Navbar.jsx', `import React from 'react';

export default function Navbar() {
  return (
    <nav className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950">
      <div className="flex items-center space-x-2">
        <span className="font-black text-xl text-indigo-400">KIOT FEST 2026</span>
        <span className="text-xs px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded font-bold">Props Demo</span>
      </div>
      <div className="text-xs text-slate-400">Knowledge Institute of Technology</div>
    </nav>
  );
}
`);

writeFile('src/components/EventCard.jsx', `import React from 'react';

/**
 * Reusable EventCard Component
 * Solves Monolithic JSX by accepting dynamic data via PROPS
 */
export default function EventCard({ title, department, description, prize, fee, date }) {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-indigo-500/50 transition">
      <div>
        <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300">{department}</span>
        <h3 className="text-xl font-bold text-white mt-2">{title}</h3>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
        <p className="text-xs text-slate-500 mt-2">📅 {date}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
        <span className="font-bold text-amber-400">Prize: {prize}</span>
        <button 
          onClick={() => alert("Props are immutable! We need useState to make buttons reactive.")}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition"
        >
          Register (₹{fee})
        </button>
      </div>
    </div>
  );
}
`);

writeFile('src/pages/index.js', `import React from 'react';
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
`);

commitStep('feat(02): extract reusable EventCard & Navbar components with dynamic props');

// ============================================================================
// STEP 3: Branch 03-state-and-event-handling
// ============================================================================
console.log('\n🌿 Building Branch: 03-state-and-event-handling');
run('git checkout -b 03-state-and-event-handling');

writeFile('src/pages/index.js', `import React, { useState } from 'react';
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
`);

commitStep('feat(03): implement reactive useState for search, filter & registration counter');

// ============================================================================
// STEP 4: Branch 04-conditional-rendering
// ============================================================================
console.log('\n🌿 Building Branch: 04-conditional-rendering');
run('git checkout -b 04-conditional-rendering');

writeFile('src/pages/index.js', `import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ALL_EVENTS = [
  { id: 1, title: 'Web Hackathon 2026', department: 'CSE', prize: '₹15,000', fee: 200, seatsLeft: 5 },
  { id: 2, title: 'Circuit Debugging', department: 'ECE', prize: '₹8,000', fee: 100, seatsLeft: 12 },
  { id: 3, title: 'GenAI Masterclass', department: 'AI&DS', prize: 'Certificates', fee: 350, seatsLeft: 8 },
  { id: 4, title: 'Robo Wars', department: 'MECH', prize: '₹25,000', fee: 300, seatsLeft: 0 }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const filteredEvents = ALL_EVENTS.filter(e => {
    const matchDept = selectedDept === 'ALL' || e.department === selectedDept;
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto text-white">
        <h1 className="text-3xl font-black mb-6">KIOT FEST 2026 (Conditional Rendering)</h1>

        <div className="flex gap-2 mb-6">
          {['ALL', 'CSE', 'ECE', 'AI&DS', 'MECH'].map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={\`px-4 py-2 rounded-xl text-xs font-bold transition \${
                selectedDept === dept ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 text-slate-400'
              }\`}
            >
              {dept}
            </button>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <p className="text-lg font-bold text-slate-300">No Events Found for "{searchQuery}"</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedDept('ALL'); }}
              className="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map(event => (
              <div key={event.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">{event.department}</span>
                    {event.seatsLeft === 0 ? (
                      <span className="text-xs font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">🔴 SOLD OUT</span>
                    ) : (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">🟢 {event.seatsLeft} Seats Left</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mt-2">{event.title}</h3>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-amber-400 font-bold">{event.prize}</span>
                  {event.seatsLeft === 0 ? (
                    <button disabled className="px-4 py-2 bg-slate-800 text-slate-500 rounded-xl text-xs font-bold cursor-not-allowed">
                      Closed
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold">
                      Register (₹{event.fee})
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
`);

commitStep('feat(04): implement conditional rendering for empty states, sold-out badges & active tabs');

// ============================================================================
// STEP 5: Branch 05-controlled-forms-validation
// ============================================================================
console.log('\n🌿 Building Branch: 05-controlled-forms-validation');
run('git checkout -b 05-controlled-forms-validation');

writeFile('src/components/RegistrationModal.jsx', `import React, { useState } from 'react';

export default function RegistrationModal({ event, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.rollNo.trim()) {
      setError('Student name and Roll number are required!');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid college email address!');
      return;
    }
    if (formData.phone.length < 10) {
      setError('Please enter a 10-digit mobile number!');
      return;
    }
    onSuccess(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full text-white space-y-4">
        <h3 className="text-xl font-bold">Register for {event?.title || 'Fest Event'}</h3>
        {error && <p className="text-xs text-rose-400 bg-rose-500/20 p-2 rounded">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Full Name *</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl"
              placeholder="e.g. Priyadharshini S"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Roll Number *</label>
            <input 
              type="text" 
              value={formData.rollNo}
              onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl uppercase"
              placeholder="e.g. 22CS045"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">College Email *</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl"
              placeholder="student@kiot.ac.in"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Mobile Phone *</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl"
              placeholder="9876543210"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-slate-800 rounded-xl font-bold">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold">Confirm Registration</button>
          </div>
        </form>
      </div>
    </div>
  );
}
`);

commitStep('feat(05): add controlled registration form with client-side validation');

// ============================================================================
// STEP 6: Branch 06-useeffect-and-api-integration
// ============================================================================
console.log('\n🌿 Building Branch: 06-useeffect-and-api-integration');
run('git checkout -b 06-useeffect-and-api-integration');
restoreFromBackup('src/components/LoadingSkeleton.jsx');
commitStep('feat(06): add useEffect lifecycle data fetching & loading skeleton component');

// ============================================================================
// STEP 7: Branch 07-react-router-spa
// ============================================================================
console.log('\n🌿 Building Branch: 07-react-router-spa');
run('git checkout -b 07-react-router-spa');
restoreFromBackup('src/pages/events');
commitStep('feat(07): introduce multi-page navigation and dynamic routes (/events/[id])');

// ============================================================================
// STEP 8: Branch 08-prop-drilling-problem
// ============================================================================
console.log('\n🌿 Building Branch: 08-prop-drilling-problem');
run('git checkout -b 08-prop-drilling-problem');

writeFile('src/pages/prop-drilling-demo.js', `import React, { useState } from 'react';

/**
 * UNIT 4 - STEP 1: THE PROP-DRILLING NIGHTMARE
 * 
 * 🔴 THE PROBLEM:
 * The Cart state lives in App / Parent.
 * To update the cart from a deep child button, we have to pass 'cart' and 'addToCart'
 * through 4 layers of components:
 * App -> EventGrid -> EventCard -> RegisterButton
 * And also pass it to Navbar and CartDrawer!
 */

function RegisterButton({ event, cart, onAddToCart }) {
  const isInCart = cart.some(item => item.id === event.id);
  return (
    <button 
      onClick={() => onAddToCart(event)}
      className="px-3 py-1.5 bg-indigo-600 rounded text-xs text-white"
    >
      {isInCart ? 'In Cart' : 'Add to Cart'}
    </button>
  );
}

function EventCard({ event, cart, onAddToCart }) {
  return (
    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between">
      <span>{event.title}</span>
      <RegisterButton event={event} cart={cart} onAddToCart={onAddToCart} />
    </div>
  );
}

export default function PropDrillingDemo() {
  const [cart, setCart] = useState([]);
  const handleAddToCart = (item) => setCart([...cart, item]);

  return (
    <div className="p-8 max-w-xl mx-auto text-white space-y-4">
      <h2 className="text-xl font-bold">Prop Drilling Demo (Cart: {cart.length})</h2>
      <EventCard event={{ id: 1, title: 'Hackathon' }} cart={cart} onAddToCart={handleAddToCart} />
    </div>
  );
}
`);

commitStep('feat(08): demonstrate prop drilling limitations across nested components');

// ============================================================================
// STEP 9: Branch 09-usecontext-and-limitations
// ============================================================================
console.log('\n🌿 Building Branch: 09-usecontext-and-limitations');
run('git checkout -b 09-usecontext-and-limitations');

writeFile('src/context/CartContext.js', `import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
`);

commitStep('feat(09): explore React Context API and document re-render trade-offs');

// ============================================================================
// STEP 10: Branch 10-redux-toolkit-store-and-cart-slice
// ============================================================================
console.log('\n🌿 Building Branch: 10-redux-toolkit-store-and-cart-slice');
run('git checkout -b 10-redux-toolkit-store-and-cart-slice');
restoreFromBackup('src/redux/slices/cartSlice.js');
restoreFromBackup('src/components/CartDrawer.jsx');

writeFile('src/redux/store.js', `import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
`);

commitStep('feat(10): setup Redux Toolkit store, cartSlice and CartDrawer slide-over');

// ============================================================================
// STEP 11: Branch 11-redux-async-thunk-events
// ============================================================================
console.log('\n🌿 Building Branch: 11-redux-async-thunk-events');
run('git checkout -b 11-redux-async-thunk-events');
restoreFromBackup('src/redux/slices/eventSlice.js');

writeFile('src/redux/store.js', `import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import eventReducer from './slices/eventSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    events: eventReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
`);

commitStep('feat(11): introduce createAsyncThunk in eventSlice for global async API state');

// ============================================================================
// STEP 12: Branch 12-redux-devtools-and-persistence
// ============================================================================
console.log('\n🌿 Building Branch: 12-redux-devtools-and-persistence');
run('git checkout -b 12-redux-devtools-and-persistence');
restoreFromBackup('src/components/EventFilters.jsx');
commitStep('feat(12): enable Redux DevTools inspection & localStorage state syncing');

// ============================================================================
// STEP 13: Branch 13-nextjs-setup-file-routing
// ============================================================================
console.log('\n🌿 Building Branch: 13-nextjs-setup-file-routing');
run('git checkout -b 13-nextjs-setup-file-routing');
restoreFromBackup('src/pages/_document.js');
restoreFromBackup('src/components/Footer.jsx');
commitStep('feat(13): Next.js architecture, file-based routing and document head setup');

// ============================================================================
// STEP 14: Branch 14-nextjs-ssg-and-ssr
// ============================================================================
console.log('\n🌿 Building Branch: 14-nextjs-ssg-and-ssr');
run('git checkout -b 14-nextjs-ssg-and-ssr');
restoreFromBackup('src/lib/mockData.js');
restoreFromBackup('src/pages/events');
commitStep('feat(14): implement SSG (getStaticProps/Paths) & SSR (getServerSideProps)');

// ============================================================================
// STEP 15: Branch 15-nextjs-api-and-mysql
// ============================================================================
console.log('\n🌿 Building Branch: 15-nextjs-api-and-mysql');
run('git checkout -b 15-nextjs-api-and-mysql');
restoreFromBackup('src/lib/db.js');
restoreFromBackup('src/pages/api/events');
restoreFromBackup('src/pages/api/register.js');
restoreFromBackup('src/pages/api/my-tickets.js');
restoreFromBackup('database');
commitStep('feat(15): fullstack API routes (/api/events, /api/register) and dual-mode MySQL support');

// ============================================================================
// STEP 16: Branch 16-cross-device-and-browser-compatibility
// ============================================================================
console.log('\n🌿 Building Branch: 16-cross-device-and-browser-compatibility');
run('git checkout -b 16-cross-device-and-browser-compatibility');
restoreFromBackup('src/styles/globals.css');
restoreFromBackup('src/components/HeroBanner.jsx');
commitStep('feat(16): fluid typography (clamp()), mobile drawer, and @supports glassmorphism fallbacks');

// ============================================================================
// STEP 17: Branch 17-image-optimization-and-seo
// ============================================================================
console.log('\n🌿 Building Branch: 17-image-optimization-and-seo');
run('git checkout -b 17-image-optimization-and-seo');
restoreFromBackup('src/components/TicketPass.jsx');
restoreFromBackup('src/pages/my-tickets.js');
commitStep('feat(17): digital QR ticket passes, printable pass layouts, and OpenGraph SEO meta');

// ============================================================================
// STEP 18: Branch 18-final-project-and-vercel-deploy
// ============================================================================
console.log('\n🌿 Building Branch: 18-final-project-and-vercel-deploy');
run('git checkout -b 18-final-project-and-vercel-deploy');
restoreFromBackup('src');
restoreFromBackup('workshop_materials');
restoreFromBackup('database');
restoreFromBackup('public');
commitStep('feat(18): coordinator authentication with static backend password, event creation portal & Vercel deployment');

// Update main to match 18
run('git checkout -B main 18-final-project-and-vercel-deploy');

// Clean up temporary backup
removePath('.kiot_final_backup');
try { run('git branch -D temp_build_branch'); } catch(e) {}

console.log('\n🎉 ALL BRANCHES (INCLUDING DEVSETUP) SUCCESSFULLY REBUILT WITH GENUINE PROGRESSIVE CODE!');
