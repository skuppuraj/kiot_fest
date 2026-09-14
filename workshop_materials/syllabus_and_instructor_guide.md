# 2-Day College Workshop: Comprehensive Instructor Guide & Syllabus

## Course Title: Fullstack Web Development with React, Redux & Next.js
**Target Audience**: 3rd-Year Computer Science & Engineering Students  
**Duration**: 2 Days (14 Hours Total)  
**Project Built**: **KIOT Fest (College Technical & Cultural Fest Portal)**  

---

## 2-Day Detailed Agenda

### DAY 1: Pre-School Foundations, JavaScript Mastery, UI/UX & React
- **08:30 - 09:15 (Unit 0 - Pre-School Foundations)**: The Evolutionary Hierarchy of Web Engineering
  - Why HTML? Semantic markup, accessibility, document tree vs plain text.
  - Why CSS? Native CSS on the SAME HTML (Box Model, Flexbox/Grid, separation of concerns & Static Wall).
  - Why Vanilla JS? Dynamic events, DOM tree mutation, and the "State Desync Hell" of Vanilla JS.
  - Why React.js? Solving Vanilla JS difficulties with Declarative Components, `useState`, and Virtual DOM.
  - Why Tailwind CSS? Solving Native CSS BEM naming fatigue, global specificity collisions, and dead CSS bloat.
  - Why Next.js? Resolving the React SPA empty `<div id="root"></div>` SEO & 3G mobile FCP crisis.
- **09:15 - 11:00 (Unit 1)**: JavaScript ES6+ & Asynchronous Deep Dive
  - `let`/`const`, Arrow functions, Template literals, Destructuring, Spread/Rest.
  - Higher-Order Functions, Closures, `map()`, `filter()`, `reduce()`.
  - Event loop, Promises, `async`/`await`, `fetch()` with error handling.
- **11:00 - 11:15**: Tea Break & Quick Quiz.
- **11:15 - 13:00 (Unit 2)**: Design Thinking & Figma UI/UX Prototyping
  - Design thinking stages applied to college events.
  - Low-fidelity wireframes to High-fidelity component design in Figma.
  - Auto-layout, component variants, design tokens, and accessibility.
- **13:00 - 14:00**: Lunch Break.
- **14:00 - 17:30 ([Unit 3](./unit3_react_fundamentals/README.md))**: React Fundamentals with Problem-Driven Learning
  - Setup environment with Vite + Tailwind CSS.
  - [Problem 1: Monolithic HTML $\to$ Reusable Components (`EventCard`, `Navbar`)](./unit3_react_fundamentals/01-why-react-and-jsx.md) (Branch: `01-react-setup-and-jsx`).
  - [Problem 2: Hardcoded data $\to$ Dynamic `props`](./unit3_react_fundamentals/02-components-and-props.md) (Branch: `02-components-and-props`).
  - [Problem 3: Static UI $\to$ Reactive `useState` & Synthetic Event handling](./unit3_react_fundamentals/03-usestate-and-synthetic-events.md) (Branch: `03-state-and-event-handling`).
  - [Problem 4: Missing search states $\to$ Conditional Rendering (`&&`, Ternary)](./unit3_react_fundamentals/04-conditional-rendering.md) (Branch: `04-conditional-rendering`).
  - [Problem 5: Page reloads on submit $\to$ Controlled Forms & Real-time Validation](./unit3_react_fundamentals/05-controlled-forms-and-validation.md) (Branch: `05-controlled-forms-validation`).
  - [Problem 6: Infinite re-render loop on fetch $\to$ `useEffect` Hook lifecycle](./unit3_react_fundamentals/06-useeffect-and-api-integration.md) (Branch: `06-useeffect-and-api-integration`).
  - [Problem 7: Multi-page navigation $\to$ `react-router-dom` dynamic routing](./unit3_react_fundamentals/07-react-router-spa.md) (Branch: `07-react-router-spa`).

---

### DAY 2: Global State, Fullstack Next.js, Compatibility & Deployment
- **09:00 - 11:30 (Unit 4)**: State Complexity & Redux Toolkit (RTK)
  - The Prop Drilling Nightmare (passing cart & registration data 4 levels down).
  - Evaluating `useContext` and observing re-render limitations.
  - Redux Toolkit Store architecture: `cartSlice` and `eventSlice`.
  - Connecting components with `useSelector` and `useDispatch`.
  - Handling asynchronous API calls with `createAsyncThunk`.
  - State persistence in `localStorage` and Redux DevTools debugging.
- **11:30 - 11:45**: Tea Break.
- **11:45 - 13:15 (Unit 5 - Part 1)**: Next.js Architecture & Hybrid Rendering
  - Why Next.js over pure React SPA? (SEO, zero-config routing, SSR/SSG).
  - File-based routing (`pages/index.js`, `pages/events/[id].js`).
  - Static Site Generation (`getStaticProps`) vs Server-Side Rendering (`getServerSideProps`).
- **13:15 - 14:00**: Lunch Break.
- **14:00 - 15:30 (Unit 5 - Part 2)**: Next.js API Routes & MySQL Database
  - Building fullstack endpoints (`/api/events`, `/api/register`, `/api/my-tickets`).
  - Dual-mode MySQL database driver with automatic in-memory mock fallback.
  - Creating student registration tickets with unique QR code generation.
- **15:30 - 16:30 (Unit 5 - Part 3)**: Cross-Device Compatibility & Performance
  - Mobile responsive drawer navigation, touch targets $\ge 48\text{px}$.
  - Fluid typography with `clamp()`, dynamic viewport units `100dvh`.
  - `@supports` backdrop-filter fallbacks and PostCSS Autoprefixer.
  - `next/image` optimization and OpenGraph SEO meta tags.
- **16:30 - 17:30**: Vercel 1-Click Deployment, Project Showcase & Student Q&A.

---

## Pedagogical Tips for the Instructor
1. **Never introduce a concept in isolation**: Always show the broken or tedious code first (e.g. show how hard it is to pass a cart counter through 4 nested components) so students feel the pain, then show how Redux makes it a 2-line solution.
2. **Encourage live debugging with DevTools**: Teach students how to open Chrome DevTools Network Tab, React Developer Tools, and Redux DevTools.
3. **Use the zero-friction DB mode**: If a student is struggling with MySQL installation on Windows/Mac, remind them the app automatically operates in mock memory mode without halting their progress.
