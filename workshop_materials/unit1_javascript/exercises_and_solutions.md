# Unit 1: JavaScript ES6+ & Async Exercises for 3rd Year CSE

Welcome to the hands-on coding drills for **Unit 1**. Before stepping into React, complete these 5 exercises. Each exercise addresses a practical feature in our **KIOT Fest** web application.

---

### Exercise 1: Destructuring & Default Values
**Goal**: Write a function `printEventSummary(event)` that accepts an event object and prints a formatted banner using template literals and object destructuring. If the coordinator phone number is missing, provide a fallback default `"Not provided"`.

```javascript
// Sample Input
const event1 = {
  id: 101,
  title: "Hack-O-Mania",
  department: "CSE",
  prizePool: "₹25,000",
  coordinator: { name: "Dr. Ramesh" } // phone is missing
};

// Solution
function printEventSummary({ title, department, prizePool, coordinator: { name, phone = "Not provided" } }) {
  console.log(`
  🎉 Event: ${title} [Dept: ${department}]
  🏆 Prize: ${prizePool}
  📞 Lead: ${name} (${phone})
  `);
}

printEventSummary(event1);
```

---

### Exercise 2: Array `.filter()` & `.map()` for Search
**Goal**: Given a list of fest events, write a function `searchEvents(events, query, dept)` that filters events matching the department (or "ALL") and containing the search query in the title (case-insensitive), then returns an array of formatted strings.

```javascript
const sampleEvents = [
  { id: 1, title: "Web Hackathon", dept: "CSE" },
  { id: 2, title: "Circuit Debugging", dept: "ECE" },
  { id: 3, title: "AI Prompt Engineering", dept: "CSE" },
  { id: 4, title: "Robo Soccer", dept: "MECH" }
];

// Solution
const searchEvents = (events, query = "", dept = "ALL") => {
  return events
    .filter(e => {
      const matchDept = dept === "ALL" || e.dept.toLowerCase() === dept.toLowerCase();
      const matchQuery = e.title.toLowerCase().includes(query.toLowerCase());
      return matchDept && matchQuery;
    })
    .map(e => `[${e.dept}] ${e.title}`);
};

console.log(searchEvents(sampleEvents, "hack", "CSE")); // ['[CSE] Web Hackathon']
console.log(searchEvents(sampleEvents, "", "ALL"));      // All 4 events
```

---

### Exercise 3: Array `.reduce()` for Cart Calculation
**Goal**: When a student adds 3 events to their registration cart, calculate:
1. Total registration fee.
2. Total events count.
3. Comma-separated list of event names.

```javascript
const studentCart = [
  { title: "Web Hackathon", fee: 200 },
  { title: "AI Workshop", fee: 350 },
  { title: "Gaming Tournament", fee: 100 }
];

// Solution
const cartSummary = studentCart.reduce((acc, item) => {
  acc.totalFee += item.fee;
  acc.eventCount += 1;
  acc.eventTitles.push(item.title);
  return acc;
}, { totalFee: 0, eventCount: 0, eventTitles: [] });

console.log(`Total Fee: ₹${cartSummary.totalFee}`);
console.log(`Registered for (${cartSummary.eventCount} events): ${cartSummary.eventTitles.join(", ")}`);
```

---

### Exercise 4: Closures - Fest Ticket Generator
**Goal**: Create a function `createTicketGenerator(prefix)` that returns a closure. Each time the inner function is called with a student's name, it increments a private counter and returns a unique ticket code like `KIOT-CSE-001`, `KIOT-CSE-002`.

```javascript
// Solution
function createTicketGenerator(deptPrefix) {
  let counter = 0; // Private state retained by closure
  
  return function(studentName) {
    counter++;
    const paddedIndex = String(counter).padStart(3, "0");
    const ticketId = `KIOT-${deptPrefix}-${paddedIndex}`;
    return {
      ticketId,
      studentName,
      issuedAt: new Date().toLocaleTimeString()
    };
  };
}

const cseTicketGen = createTicketGenerator("CSE");
console.log(cseTicketGen("Ananya")); // KIOT-CSE-001
console.log(cseTicketGen("Barath")); // KIOT-CSE-002
```

---

### Exercise 5: Async/Await with `try...catch` API Simulation
**Goal**: Write an `async` function `registerStudentForFest(studentData)` that calls a simulated async API. If the student roll number already exists, throw an error and handle it gracefully.

```javascript
// Simulated API
const registeredRollNumbers = new Set(["22CS001", "22CS002"]);

const apiRegisterCall = async (student) => {
  // Simulate 300ms network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (registeredRollNumbers.has(student.rollNo)) {
    throw new Error(`Roll No ${student.rollNo} is already registered!`);
  }
  registeredRollNumbers.add(student.rollNo);
  return { success: true, message: `Registration confirmed for ${student.name}` };
};

// Solution
async function handleRegistration(student) {
  try {
    console.log("Submitting registration...");
    const response = await apiRegisterCall(student);
    console.log("✅ SUCCESS:", response.message);
  } catch (error) {
    console.error("❌ FAILED:", error.message);
  }
}

// Tests
handleRegistration({ name: "Divya", rollNo: "22CS003" }); // Succeeds
handleRegistration({ name: "Sanjay", rollNo: "22CS001" }); // Fails (Duplicate)
```
