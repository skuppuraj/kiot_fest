# ⚛️ Unit 3 — Step 4: Conditional Rendering

> **Git Branch:** `04-conditional-rendering`  
> **Topic:** Declarative UI Branching, Ternary Operators, Short-Circuit Evaluation (`&&`), and Edge Case Handling  
> **Pain Point:** Unhandled empty states display blank screens; sold-out events allow registrations; active filters lack visual cues.

---

## 🔴 The Pain Points: The 3 Missing States in KIOT Fest

In Step 3, our interactive event finder worked well under happy paths, but failed on three critical real-world edge cases:

1. **The Empty Search Void:** When a user searches for `"Hackathon 3000"`, `filteredEvents` is empty. The screen shows an eerie, blank black rectangle. The user thinks the app crashed!
2. **The Sold-Out Violation:** *"Robo Wars"* has `seatsLeft: 0`. Yet, the card shows an active *"Quick Register"* button. Students can still click it, causing overselling!
3. **The Silent Filter Tab:** Department filter tabs all look identical. The user cannot see whether *"CSE"* or *"All Departments"* is currently selected.

---

## 💡 The 4 Core Patterns of Conditional Rendering in React

Because JSX compiles to JavaScript expressions, we use standard JavaScript operators to conditionally control what elements appear on screen.

---

### 1. The Ternary Operator (`condition ? exprIfTrue : exprIfFalse`)
Used when you want to render one of two alternatives (A or B).

#### Use Case A: Empty State vs Event Grid
```jsx
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
      <EventCard key={event.id} {...event} />
    ))}
  </div>
)}
```

#### Use Case B: Sold-Out Badge vs Seats Left Badge
```jsx
{event.seatsLeft === 0 ? (
  <span className="text-xs font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded">
    🔴 SOLD OUT
  </span>
) : (
  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
    🟢 {event.seatsLeft} Seats Left
  </span>
)}
```

#### Use Case C: Enabled vs Disabled Action Button
```jsx
{event.seatsLeft === 0 ? (
  <button 
    disabled 
    className="px-4 py-2 bg-slate-800 text-slate-500 rounded-xl text-xs font-bold cursor-not-allowed"
  >
    Registrations Closed
  </button>
) : (
  <button 
    onClick={() => handleRegister(event)}
    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold transition"
  >
    Register (₹{event.fee})
  </button>
)}
```

---

### 2. Logical AND (`&&`) Short-Circuiting
Used when you want to render an element if a condition is true, and **render nothing** if false:

```jsx
// Renders the Flagship star ONLY if isFlagship is true
{event.isFlagship && (
  <span className="text-amber-400 text-xs font-bold">⭐ Flagship Event</span>
)}
```

#### ⚠️ The Infamous "Zero Trap" in React:
```jsx
// ❌ GOTCHA: If count is 0, JavaScript evaluates 0 && <Badge /> to the number 0!
// This literally renders the digit "0" on your webpage!
{notifications.length && <Badge count={notifications.length} />}

// ✅ SOLUTION 1: Explicit boolean check
{notifications.length > 0 && <Badge count={notifications.length} />}

// ✅ SOLUTION 2: Convert to boolean with Boolean() or !!
{!!notifications.length && <Badge count={notifications.length} />}
```

---

### 3. Dynamic Styling with Conditional Classes
In modern Tailwind CSS development, we use JavaScript template literals to conditionally apply classes:

```jsx
<div className="flex gap-2 mb-6">
  {['ALL', 'CSE', 'ECE', 'AI&DS', 'MECH'].map(dept => (
    <button
      key={dept}
      onClick={() => setSelectedDept(dept)}
      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
        selectedDept === dept 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
          : 'bg-slate-900 text-slate-400 hover:text-slate-200'
      }`}
    >
      {dept}
    </button>
  ))}
</div>
```
When `selectedDept === 'CSE'`, that tab glows with an indigo background and shadow, while the others remain subtle dark slate buttons.

---

### 4. Early Return Pattern (Guard Clauses)
If a component has nothing to display or needs to render an error screen, return early before the main JSX:

```jsx
function FestStatus({ isServerDown }) {
  if (isServerDown) {
    return (
      <div className="p-8 text-center bg-rose-950/40 text-rose-300 rounded-2xl">
        <h2>⚠️ KIOT Fest Server Under Maintenance</h2>
        <p>Please check back at 09:00 AM.</p>
      </div>
    );
  }

  // Normal flow continues below
  return <EventGrid />;
}
```

---

## 🔴 The Pain Point Leading to Step 5

Right now, clicking **"Register"** simply increments a number in the header.

In our real college fest, we need student details:
- **Full Name** (e.g. Priyadharshini S)
- **Roll Number** (e.g. 22CS045)
- **College Email** (must end in `@kiot.ac.in`)
- **Mobile Number** (10 digits)

If we create a standard HTML `<form>` and the student clicks **"Submit"**, the browser's default behavior triggers a **full page reload** (`GET /?name=Priyadharshini...`).  
When the page reloads, all React memory is erased! The registration counter resets back to 0!

How do we intercept form submission and manage student input in React?

---

## ⏭️ Next Step: Controlled Forms & Validation
Proceed to **[Unit 3 — Step 5: Controlled Forms & Validation](./05-controlled-forms-and-validation.md)**!
