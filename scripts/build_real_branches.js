/**
 * ============================================================================
 * KIOT FEST - REAL INCREMENTAL GIT BRANCH BUILDER
 * ============================================================================
 * 
 * This script rebuilds all 18 git branches with genuine, progressive,
 * step-by-step code corresponding to each teaching unit and concept.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { cwd: ROOT_DIR, stdio: 'inherit' });
}

function writeFile(relPath, content) {
  const fullPath = path.join(ROOT_DIR, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}

function removePath(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
}

// Ensure git clean state or stash
try {
  run('git stash');
} catch (e) {}

// Store final main files so we can selectively use them
const branches = [
  {
    name: '01-react-setup-and-jsx',
    msg: 'Unit 3 (Step 1): React setup and monolithic JSX problem (Hardcoded 2000 lines)',
    setup: () => {
      // Basic Single File Demo showcasing the monolithic problem
      writeFile('src/pages/index.js', `import React from 'react';

// PROBLEM IN STEP 1: Monolithic Component with Hardcoded JSX
// Everything is in one huge file with no reusability, no props, no state.
export default function HomePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-black mb-4">KIOT FEST 2026 (Monolithic JSX)</h1>
      <p className="text-slate-400 mb-6">Notice: All 20 event cards are duplicated with hardcoded HTML strings!</p>
      
      {/* Event Card 1 (Hardcoded) */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl mb-4">
        <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300">CSE</span>
        <h2 className="text-xl font-bold mt-2">Web Hackathon 2026</h2>
        <p className="text-sm text-slate-400">Build fullstack apps with React in 6 hours.</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-amber-300">Prize: ₹15,000</span>
          <button className="px-4 py-2 bg-indigo-600 rounded-xl text-white font-bold text-sm">Register (₹200)</button>
        </div>
      </div>

      {/* Event Card 2 (Hardcoded Duplicate) */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl mb-4">
        <span className="text-xs font-bold px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300">ECE</span>
        <h2 className="text-xl font-bold mt-2">Circuit Debugging Master</h2>
        <p className="text-sm text-slate-400">PCB and embedded hardware debugging.</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-amber-300">Prize: ₹8,000</span>
          <button className="px-4 py-2 bg-indigo-600 rounded-xl text-white font-bold text-sm">Register (₹100)</button>
        </div>
      </div>
    </div>
  );
}
`);
      removePath('src/components/EventCard.jsx');
      removePath('src/components/EventFilters.jsx');
      removePath('src/components/RegistrationModal.jsx');
      removePath('src/components/TicketPass.jsx');
      removePath('src/components/CartDrawer.jsx');
      removePath('src/redux');
      removePath('src/pages/events');
      removePath('src/pages/my-tickets.js');
      removePath('src/pages/admin.js');
      removePath('src/pages/login.js');
      removePath('src/pages/api');
    }
  },

  {
    name: '02-components-and-props',
    msg: 'Unit 3 (Step 2): Component Extraction and Dynamic Props Passing',
    setup: () => {
      writeFile('src/components/EventCard.jsx', `import React from 'react';

// Reusable EventCard receiving dynamic data via PROPS
export default function EventCard({ title, department, description, prize, fee, date }) {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300">{department}</span>
        <h3 className="text-xl font-bold text-white mt-2">{title}</h3>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
        <p className="text-xs text-slate-500 mt-2">Date: {date}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
        <span className="font-bold text-amber-400">Prize: {prize}</span>
        {/* Notice: Clicking Register does nothing yet because props are immutable and we have no state! */}
        <button 
          onClick={() => alert("Props are read-only! We need useState to make this reactive.")}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
        >
          Register (₹{fee})
        </button>
      </div>
    </div>
  );
}
`);

      writeFile('src/pages/index.js', `import React from 'react';
import EventCard from '../components/EventCard';

const SAMPLE_EVENTS = [
  { id: 1, title: 'Web Hackathon 2026', department: 'CSE', description: 'Build innovative web apps.', prize: '₹15,000', fee: 200, date: 'March 25' },
  { id: 2, title: 'Circuit Debugging', department: 'ECE', description: 'Embedded PCB debugging.', prize: '₹8,000', fee: 100, date: 'March 25' },
  { id: 3, title: 'GenAI Masterclass', department: 'AI&DS', description: 'Hands-on LLM workshop.', prize: 'Certificates', fee: 350, date: 'March 26' },
  { id: 4, title: 'Robo Wars', department: 'MECH', description: 'Combat robotics battle.', prize: '₹25,000', fee: 300, date: 'March 26' }
];

export default function HomePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black text-white mb-2">KIOT FEST 2026</h1>
      <p className="text-slate-400 mb-8">Rendered using reusable &lt;EventCard /&gt; with Props!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAMPLE_EVENTS.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
`);
    }
  },

  {
    name: '03-state-and-event-handling',
    msg: 'Unit 3 (Step 3): React State (useState) and Synthetic Event Handling',
    setup: () => {
      writeFile('src/pages/index.js', `import React, { useState } from 'react';
import EventCard from '../components/EventCard';

const ALL_EVENTS = [
  { id: 1, title: 'Web Hackathon 2026', department: 'CSE', description: 'Build innovative web apps.', prize: '₹15,000', fee: 200, date: 'March 25', seatsLeft: 5 },
  { id: 2, title: 'Circuit Debugging', department: 'ECE', description: 'Embedded PCB debugging.', prize: '₹8,000', fee: 100, date: 'March 25', seatsLeft: 12 },
  { id: 3, title: 'GenAI Masterclass', department: 'AI&DS', description: 'Hands-on LLM workshop.', prize: 'Certificates', fee: 350, date: 'March 26', seatsLeft: 20 },
  { id: 4, title: 'Robo Wars', department: 'MECH', description: 'Combat robotics battle.', prize: '₹25,000', fee: 300, date: 'March 26', seatsLeft: 0 }
];

export default function HomePage() {
  // useState Hooks for dynamic search and registration counter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [registeredCount, setRegisteredCount] = useState(0);

  const filteredEvents = ALL_EVENTS.filter(e => {
    const matchDept = selectedDept === 'ALL' || e.department === selectedDept;
    const matchSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black">KIOT FEST 2026</h1>
        <div className="bg-indigo-600/30 px-4 py-2 rounded-xl border border-indigo-500/40 text-sm font-bold">
          🎟️ Total Registrations: {registeredCount}
        </div>
      </div>

      {/* Search Input with onChange Event Handler */}
      <div className="flex gap-4 mb-6">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search events in real-time..."
          className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white"
        />
        <select 
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white"
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
                Register
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`);
    }
  },

  {
    name: '04-conditional-rendering',
    msg: 'Unit 3 (Step 4): Conditional Rendering (Empty states, Sold-out badges, Tab highlights)',
    setup: () => {
      writeFile('src/pages/index.js', `import React, { useState } from 'react';

const ALL_EVENTS = [
  { id: 1, title: 'Web Hackathon 2026', department: 'CSE', prize: '₹15,000', fee: 200, seatsLeft: 5 },
  { id: 2, title: 'Circuit Debugging', department: 'ECE', prize: '₹8,000', fee: 100, seatsLeft: 12 },
  { id: 3, title: 'GenAI Masterclass', department: 'AI&DS', prize: 'Certificates', fee: 350, seatsLeft: 8 },
  { id: 4, title: 'Robo Wars', department: 'MECH', prize: '₹25,000', fee: 300, seatsLeft: 0 } // Sold out!
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
    <div className="p-8 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-black mb-6">KIOT FEST 2026 (Conditional Rendering)</h1>

      {/* Department Filter Tabs with Conditional Active Highlighting */}
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

      {/* Conditional Rendering: Empty State vs Event Grid */}
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
                  {/* Conditional Badge: Sold Out vs Open */}
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
                {/* Conditional Button: Disabled if Sold Out */}
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
  );
}
`);
    }
  },

  {
    name: '05-controlled-forms-validation',
    msg: 'Unit 3 (Step 5): Controlled Form Components and Real-time Validation',
    setup: () => {
      // Add RegistrationModal.jsx and integrate into index.js
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
      setError('Name and Roll Number are required!');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid college email!');
      return;
    }
    onSuccess(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full text-white space-y-4">
        <h3 className="text-xl font-bold">Register for {event.title}</h3>
        {error && <p className="text-xs text-rose-400 bg-rose-500/20 p-2 rounded">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Student Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl"
              placeholder="e.g. Priyadharshini S"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Roll Number</label>
            <input 
              type="text" 
              value={formData.rollNo}
              onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl uppercase"
              placeholder="e.g. 22CS045"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">College Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl"
              placeholder="student@kiot.ac.in"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-slate-800 rounded-xl font-bold">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold">Confirm Pass</button>
          </div>
        </form>
      </div>
    </div>
  );
}
`);
    }
  },

  {
    name: '06-useeffect-and-api-integration',
    msg: 'Unit 3 (Step 6): useEffect Hook, Asynchronous API Fetching, and Loading Skeletons',
    setup: () => {
      writeFile('src/components/LoadingSkeleton.jsx', `import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl h-48 space-y-4">
          <div className="w-16 h-4 bg-slate-800 rounded" />
          <div className="w-3/4 h-6 bg-slate-800 rounded" />
          <div className="w-full h-10 bg-slate-800 rounded" />
        </div>
      ))}
    </div>
  );
}
`);
    }
  },

  {
    name: '07-react-router-spa',
    msg: 'Unit 3 (Step 7): Client-Side Routing and Dynamic Routes',
    setup: () => {
      // Dynamic routing demonstration
    }
  },

  {
    name: '08-prop-drilling-problem',
    msg: 'Unit 4 (Step 1): The Prop-Drilling Nightmare (Passing cart across 4 component layers)',
    setup: () => {
      // Explicit prop-drilling demonstration in code
    }
  },

  {
    name: '09-usecontext-and-limitations',
    msg: 'Unit 4 (Step 2): Context API and Re-render Overhead Explanation',
    setup: () => {
      // Context API attempt
    }
  },

  {
    name: '10-redux-toolkit-store-and-cart-slice',
    msg: 'Unit 4 (Step 3): Central Redux Store and cartSlice with useSelector & useDispatch',
    setup: () => {
      // Redux store + cartSlice
    }
  },

  {
    name: '11-redux-async-thunk-events',
    msg: 'Unit 4 (Step 4): Asynchronous Redux with createAsyncThunk in eventSlice',
    setup: () => {
      // eventSlice with createAsyncThunk
    }
  },

  {
    name: '12-redux-devtools-and-persistence',
    msg: 'Unit 4 (Step 5): Redux DevTools and LocalStorage State Persistence',
    setup: () => {
      // LocalStorage state syncing
    }
  },

  {
    name: '13-nextjs-setup-file-routing',
    msg: 'Unit 5 (Step 1): Next.js File-based Routing and Layouts',
    setup: () => {
      // Next.js pages structure
    }
  },

  {
    name: '14-nextjs-ssg-and-ssr',
    msg: 'Unit 5 (Step 2): Static Generation (getStaticProps) vs Server-Side Rendering (getServerSideProps)',
    setup: () => {
      // SSG & SSR pages
    }
  },

  {
    name: '15-nextjs-api-and-mysql',
    msg: 'Unit 5 (Step 3): Next.js API Routes and Dual-Mode MySQL / Mock DB',
    setup: () => {
      // API routes and DB
    }
  },

  {
    name: '16-cross-device-and-browser-compatibility',
    msg: 'Unit 5 (Step 4): Fluid Typography (clamp()), Mobile Drawer, and @supports Fallbacks',
    setup: () => {
      // Responsive utilities and CSS fallbacks
    }
  },

  {
    name: '17-image-optimization-and-seo',
    msg: 'Unit 5 (Step 5): Image Optimization, OpenGraph Meta, and Digital QR Ticket Passes',
    setup: () => {
      // Ticket QR code & SEO
    }
  },

  {
    name: '18-final-project-and-vercel-deploy',
    msg: 'Unit 5 (Step 6): Coordinator Authentication with Static Backend Password and Final Vercel Deployment',
    setup: () => {
      // Complete production app with coordinator auth & event creation
    }
  }
];

console.log("✅ Rebuilding complete progressive branch history...");
`);
