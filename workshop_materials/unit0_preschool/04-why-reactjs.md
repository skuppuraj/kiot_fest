# ⚛️ Unit 0 - Pre-School 04: Why React.js?
> **KIOT FEST 2026 Fullstack Web Development Workshop**  
> *Target Audience: Engineering Students understanding the difficulties faced in Vanilla JS and how React solves them.*

---

## 🎯 The Core Question
> **"What difficulties did we face in Vanilla JS, and how does React.js completely eliminate them?"**

In `preschool-03-why-vanilla-js`, we felt the pain of manual DOM manipulation:
- Manually querying elements with `document.getElementById` and `document.querySelector`.
- Writing fragile imperative update code that easily desynchronizes the visual UI from actual data.
- Copy-pasting 30 lines of HTML for every single event card.
- Performance bottlenecks caused by repetitive direct browser DOM reflows and repaints.

**React.js** was invented by engineers at Meta to solve these exact difficulties through **3 revolutionary breakthroughs**:

---

## 1. 🔄 Imperative vs Declarative: $UI = f(state)$

### The Vanilla JS Way (Imperative = "HOW to update step-by-step")
In Vanilla JS, you are the construction worker micromanaging every brick:
```javascript
// ❌ Vanilla JS (Imperative):
const countEl = document.getElementById('cart-count');
const btn = document.getElementById('reg-btn-1');

// Step 1: change in-memory array
cart.push(event1);
// Step 2: find and mutate DOM node 1
countEl.innerText = cart.length;
// Step 3: find and mutate DOM node 2
btn.innerText = 'Selected ✓';
// Step 4: mutate DOM node class
btn.classList.add('selected');
```

### The React.js Way (Declarative = "WHAT the UI should look like for a given state")
In React, you simply declare: *"The button should say 'Selected ✓' if the event is in the cart, and the badge should show the cart length."*
```jsx
// ✅ React.js (Declarative):
const [cart, setCart] = useState([]);

// When clicked, simply update state:
setCart([...cart, event1]);

// React handles ALL DOM updates automatically!
return (
  <div>
    <span className="badge">{cart.length}</span>
    <button className={cart.includes(event.id) ? 'selected' : ''}>
      {cart.includes(event.id) ? 'Selected ✓' : 'Register'}
    </button>
  </div>
);
```
$$\text{UI} = f(\text{State})$$
Whenever `state` changes, React re-renders the component. **State desynchronization becomes mathematically impossible!**

---

## 2. 🧩 Monolithic Copy-Paste vs Reusable Components

In `raw_html_demo.html`, having 3 events meant 90 lines of duplicate HTML markup. Adding a 4th event meant copy-pasting another block.

In React, we define an **`<EventCard />` component** once:
```jsx
function EventCard({ event, isSelected, onToggle }) {
  return (
    <article className="event-card">
      <span className="dept-tag">{event.dept}</span>
      <h3>{event.title}</h3>
      <p>{event.desc}</p>
      <button onClick={() => onToggle(event.id)}>
        {isSelected ? 'Selected ✓' : `Register (₹${event.fee})`}
      </button>
    </article>
  );
}
```
And render 100 events with a single dynamic loop:
```jsx
{events.map(event => (
  <EventCard 
    key={event.id} 
    event={event} 
    isSelected={cart.includes(event.id)} 
    onToggle={handleToggle} 
  />
))}
```

---

## 3. ⚡ Direct DOM Reflows vs The Virtual DOM

In Vanilla JS:
- Every `document.getElementById().innerText = ...` causes the browser engine (Blink/WebKit) to recalculate layout (**reflow**) and repaint pixels on screen.
- If you update 10 elements in a loop, the browser triggers 10 separate layout passes, causing lag and jank.

In React:
- React maintains a fast in-memory copy of the UI called the **Virtual DOM**.
- When state changes, React creates a new Virtual DOM tree, calculates the exact minimum differences (**Reconciliation / Diffing algorithm**), and updates the real browser DOM in a single batched operation.

---

## 🛑 The Next Question: What about Styling?
React solves JavaScript logic and component structure. But how do we style React components?
If we use Native CSS, we run into **class naming fatigue, specificity wars, and dead CSS bloat**.

> 💡 **The Next Evolution**: How does Tailwind CSS solve the difficulties of Native CSS?  
> 👉 **Switch to branch:** `git checkout preschool-05-native-css-to-tailwind`
