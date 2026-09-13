/**
 * ============================================================================
 * KIOT FEST WORKSHOP - UNIT 1: JAVASCRIPT ES6+ ESSENTIALS
 * Target Audience: 3rd Year CSE Students
 * ============================================================================
 * 
 * In this module, we cover the core building blocks of modern JavaScript
 * required before diving into React and Next.js.
 */

// ----------------------------------------------------------------------------
// 1. LET vs CONST vs VAR (Scope & Mutability)
// ----------------------------------------------------------------------------
// PROBLEM with 'var': Function-scoped, hoisted with undefined, allows re-declaration.
// SOLUTION: 'let' (block-scoped, re-assignable) and 'const' (block-scoped, immutable binding).

function scopeDemonstration() {
    if (true) {
        var festNameOld = "KIOT Fest 2024 (var - leaked outside block)";
        let festNameNew = "KIOT Fest 2026 (let - block scoped)";
        const college = "Knowledge Institute of Technology";
        console.log("Inside block:", festNameNew, "at", college);
    }

    console.log("Outside block (var leaks):", festNameOld);
    // console.log(festNameNew); // ReferenceError: festNameNew is not defined
}
scopeDemonstration();

// Note on 'const' with Objects and Arrays:
// 'const' prevents re-assigning the variable identifier, but object properties can still mutate!
const eventConfig = {
    title: "Web Hackathon",
    department: "CSE",
    maxTeams: 30
};
eventConfig.maxTeams = 40; // Allowed!
// eventConfig = {}; // TypeError: Assignment to constant variable.


// ----------------------------------------------------------------------------
// 2. ARROW FUNCTIONS vs TRADITIONAL FUNCTIONS
// ----------------------------------------------------------------------------
// Traditional function
function calculateTotalPrizeTraditional(p1, p2, p3) {
    return p1 + p2 + p3;
}

// Arrow function (Concise syntax, lexical 'this' binding)
const calculateTotalPrize = (p1, p2, p3) => p1 + p2 + p3;

// Single parameter concise syntax
const formatEventTitle = title => `⚡ KIOT FEST: ${title.toUpperCase()} ⚡`;

console.log(formatEventTitle("Hackathon")); // ⚡ KIOT FEST: HACKATHON ⚡
console.log("Total Prize:", calculateTotalPrize(10000, 5000, 2500));


// ----------------------------------------------------------------------------
// 3. TEMPLATE LITERALS & STRING INTERPOLATION
// ----------------------------------------------------------------------------
const studentName = "Aravind";
const eventName = "AI Project Expo";
const venue = "CSE Seminar Hall";
const time = "10:00 AM";

// Old way: String concatenation with '+'
const badgeOld = "Pass for " + studentName + " in " + eventName + " at " + venue + " (" + time + ")";

// Modern ES6 way: Template literals with backticks ``
const badgeNew = `
🎫 ===============================
   KIOT FEST REGISTRATION PASS
   Student : ${studentName}
   Event   : ${eventName}
   Venue   : ${venue}
   Time    : ${time}
==================================`;

console.log(badgeNew);


// ----------------------------------------------------------------------------
// 4. DESTRUCTURING ASSIGNMENT (Objects & Arrays)
// ----------------------------------------------------------------------------
// Used heavily in React (Props destructuring, Hook return values)

// A. Object Destructuring
const eventDetails = {
    id: "EVT-01",
    name: "Code Combat (Debugging & DSA)",
    dept: "CSE",
    entryFee: 150,
    coordinator: {
        faculty: "Dr. K. Ramesh",
        student: "Priya S"
    }
};

// Extracting values directly:
const { name, dept, entryFee, coordinator: { student: studentCoord } } = eventDetails;
console.log(`Event: ${name} | Dept: ${dept} | Fee: ₹${entryFee} | Lead: ${studentCoord}`);

// B. Array Destructuring (Foundation for useState)
const eventRanks = ["Team Alpha", "Team ByteCraft", "Team NeuralNet"];
const [winner, runnerUp, secondRunnerUp] = eventRanks;
console.log(`1st: ${winner}, 2nd: ${runnerUp}, 3rd: ${secondRunnerUp}`);


// ----------------------------------------------------------------------------
// 5. SPREAD & REST OPERATORS (...)
// ----------------------------------------------------------------------------
// A. Spread Operator: Expanding arrays and objects (Immutable updates in React/Redux)
const cseEvents = ["Hackathon", "Web Design", "Paper Presentation"];
const itEvents = ["App Dev", "Cyber Hunt"];
const allTechEvents = [...cseEvents, ...itEvents, "Robo Wars"];

console.log("Combined Tech Events:", allTechEvents);

// Object cloning and immutable property updating:
const baseRegistration = {
    college: "KIOT",
    paymentStatus: "Pending",
    foodCoupon: true
};

// Student registers for Web Hackathon:
const studentRegistration = {
    ...baseRegistration,
    studentName: "Dharun",
    rollNo: "22CS045",
    paymentStatus: "Paid" // Overrides 'Pending'
};
console.log("Final Registration Object:", studentRegistration);

// B. Rest Operator: Bundling remaining arguments into an array
function registerMultipleStudents(eventTitle, ...studentList) {
    console.log(`Registered for ${eventTitle}:`, studentList);
}
registerMultipleStudents("AI Workshop", "Suresh", "Kavya", "Manish", "Deepa");


// ----------------------------------------------------------------------------
// 6. DEFAULT PARAMETERS
// ----------------------------------------------------------------------------
function generateTicket(name = "Guest Attendee", college = "Knowledge Institute of Technology", fee = 0) {
    return {
        ticketId: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
        name,
        college,
        fee,
        issuedAt: new Date().toISOString()
    };
}

console.log(generateTicket("Karthik"));
console.log(generateTicket()); // Uses all defaults
