/**
 * ============================================================================
 * KIOT FEST WORKSHOP - UNIT 1: JAVASCRIPT ES6+ ESSENTIALS
 * Format: "OLD WAY (ES5)" vs "NEW WAY (ES6+)" Side-by-Side Comparison
 * Run in Terminal: node workshop_materials/unit1_javascript/01-es6-essentials.js
 * ============================================================================
 */

console.log("\n==================================================");
console.log("🚀 ES5 (OLD WAY) vs ES6+ (NEW WAY) DEMONSTRATION");
console.log("==================================================\n");

// ----------------------------------------------------------------------------
// 1. VARIABLES: VAR vs LET & CONST (Scope & Mutability)
// ----------------------------------------------------------------------------
console.log("--- 1. VARIABLES & SCOPE ---");

// ❌ OLD WAY (ES5): 'var' is function-scoped and leaks out of blocks (if, for, while)
function testScopeOld() {
    if (true) {
        var festOld = "KIOT Fest 2024"; // Leaks out of this 'if' block!
    }
    console.log("❌ Old Way (var leaked outside if-block):", festOld);
}
testScopeOld();

// ✅ NEW WAY (ES6+): 'let' & 'const' are block-scoped to { ... }
function testScopeNew() {
    if (true) {
        const college = "Knowledge Institute of Technology";
        let festNew = "KIOT Fest 2026";
        console.log("✅ New Way (inside block):", festNew, "at", college);
    }
    // console.log(festNew); // ReferenceError: festNew is not defined (prevents accidental leakage!)
}
testScopeNew();

// 'const' prevents re-assigning the variable, but allows mutating object properties:
const eventConfig = { title: "Web Hackathon", maxTeams: 30 };
eventConfig.maxTeams = 40; // Allowed!
// eventConfig = {};       // ❌ TypeError: Assignment to constant variable.


// ----------------------------------------------------------------------------
// 2. FUNCTIONS: TRADITIONAL vs ARROW FUNCTIONS
// ----------------------------------------------------------------------------
console.log("\n--- 2. FUNCTIONS & ARROW SYNTAX ---");

// ❌ OLD WAY (ES5): Verbose 'function' keyword, requires explicit return
function calculateTotalOld(p1, p2, p3) {
    return p1 + p2 + p3;
}
console.log("❌ Old Way Total Prize:", calculateTotalOld(10000, 5000, 2500));

// ✅ NEW WAY (ES6+): Concise arrow syntax with implicit return
const calculateTotalNew = (p1, p2, p3) => p1 + p2 + p3;
console.log("✅ New Way Total Prize:", calculateTotalNew(10000, 5000, 2500));

// Single parameter shorthand:
const formatEventTitle = title => `⚡ KIOT FEST: ${title.toUpperCase()} ⚡`;
console.log("✅ Arrow Shorthand:", formatEventTitle("Hackathon"));

// Lexical 'this' binding demonstration:
const timerOld = {
    dept: "CSE",
    announce: function() {
        var self = this; // ❌ Old ES5 workaround: saving 'this' context
        setTimeout(function() {
            console.log("❌ Old Way callback (self.dept):", self.dept);
        }, 10);
    }
};
timerOld.announce();

const timerNew = {
    dept: "CSE",
    announce: function() {
        // ✅ New Way: Arrow function automatically inherits surrounding 'this'!
        setTimeout(() => {
            console.log("✅ New Way callback (this.dept):", this.dept);
        }, 20);
    }
};
timerNew.announce();


// ----------------------------------------------------------------------------
// 3. STRINGS: CONCATENATION vs TEMPLATE LITERALS
// ----------------------------------------------------------------------------
console.log("\n--- 3. STRINGS & TEMPLATE LITERALS ---");

const student = "Aravind";
const eventName = "AI Project Expo";
const venue = "CSE Seminar Hall";
const time = "10:00 AM";

// ❌ OLD WAY (ES5): Clunky quotes and '+' concatenation
var passOld = "Pass for " + student + " in " + eventName + " at " + venue + " (" + time + ")";
console.log("❌ Old Way String:\n" + passOld);

// ✅ NEW WAY (ES6+): Backticks with embedded expressions ${...}
const passNew = `Pass for ${student} in ${eventName} at ${venue} (${time})`;
console.log("\n✅ New Way Template Literal:\n" + passNew);

// Natural multi-line strings without '\n':
const badgeNew = `
🎫 -------------------------------
   KIOT FEST REGISTRATION PASS
   Student : ${student}
   Event   : ${eventName}
   Venue   : ${venue}
   Time    : ${time}
----------------------------------`;
console.log(badgeNew);


// ----------------------------------------------------------------------------
// 4. DESTRUCTURING: MANUAL EXTRACTION vs DESTRUCTURING ASSIGNMENT
// ----------------------------------------------------------------------------
console.log("--- 4. OBJECT & ARRAY DESTRUCTURING ---");

const eventDetails = {
    id: "EVT-01",
    title: "Code Combat (Debugging)",
    dept: "CSE",
    entryFee: 150,
    lead: "Priya S"
};

// ❌ OLD WAY (ES5): Manually repeating object names to extract each property
var idOld = eventDetails.id;
var titleOld = eventDetails.title;
var feeOld = eventDetails.entryFee;
console.log("❌ Old Way Extraction:", titleOld, "| Fee: ₹" + feeOld);

// ✅ NEW WAY (ES6+): Clean Object Destructuring in 1 line
const { id, title, entryFee, lead } = eventDetails;
console.log("✅ New Way Destructuring:", title, "| Fee: ₹" + entryFee, "| Lead:", lead);

// ----------------------------------------------------------------------------
// Array Destructuring (Foundation for React's useState):
const eventRanks = ["Team Alpha (1st)", "Team ByteCraft (2nd)", "Team NeuralNet (3rd)"];

// ❌ OLD WAY (ES5): Accessing elements by array index
var winnerOld = eventRanks[0];
var runnerUpOld = eventRanks[1];
console.log("❌ Old Way Array Index:", winnerOld, runnerUpOld);

// ✅ NEW WAY (ES6+): Array Destructuring
const [winner, runnerUp, secondRunnerUp] = eventRanks;
console.log("✅ New Way Destructuring:", winner, runnerUp);


// ----------------------------------------------------------------------------
// 5. SPREAD & REST OPERATORS (...)
// ----------------------------------------------------------------------------
console.log("\n--- 5. SPREAD & REST OPERATORS ---");

// A. Merging Arrays:
const cseEvents = ["Hackathon", "Web Design"];
const itEvents = ["App Dev", "Cyber Hunt"];

// ❌ OLD WAY (ES5): Array.prototype.concat()
var allEventsOld = cseEvents.concat(itEvents).concat(["Robo Wars"]);
console.log("❌ Old Way concat():", allEventsOld);

// ✅ NEW WAY (ES6+): Array Spread Operator
const allEventsNew = [...cseEvents, ...itEvents, "Robo Wars"];
console.log("✅ New Way Spread [...]:", allEventsNew);

// B. Updating Objects Immutably (Crucial for React State & Redux):
const baseRegistration = {
    college: "KIOT",
    paymentStatus: "Pending",
    foodCoupon: true
};

// ❌ OLD WAY (ES5): Object.assign()
var regOld = Object.assign({}, baseRegistration, {
    studentName: "Dharun",
    rollNo: "22CS045",
    paymentStatus: "Paid" // Overrides 'Pending'
});
console.log("❌ Old Way Object.assign():", regOld);

// ✅ NEW WAY (ES6+): Object Spread {...}
const regNew = {
    ...baseRegistration,
    studentName: "Dharun",
    rollNo: "22CS045",
    paymentStatus: "Paid" // Overrides 'Pending'
};
console.log("✅ New Way Object Spread:", regNew);

// C. Function Arguments:
// ❌ OLD WAY (ES5): Using the confusing 'arguments' pseudo-array
function registerStudentsOld() {
    var event = arguments[0];
    var students = Array.prototype.slice.call(arguments, 1); // Converting arguments to real array
    console.log("❌ Old Way arguments:", event, students);
}
registerStudentsOld("AI Workshop", "Suresh", "Kavya");

// ✅ NEW WAY (ES6+): Clean Rest Parameter (...studentList)
function registerStudentsNew(event, ...students) {
    console.log("✅ New Way Rest (...):", event, students);
}
registerStudentsNew("AI Workshop", "Suresh", "Kavya");


// ----------------------------------------------------------------------------
// 6. DEFAULT PARAMETERS
// ----------------------------------------------------------------------------
console.log("\n--- 6. DEFAULT PARAMETERS ---");

// ❌ OLD WAY (ES5): Checking undefined or using '||' (falsy bug: fee = 0 gets replaced!)
function generateTicketOld(name, college, fee) {
    var studentName = name || "Guest Attendee";
    var collegeName = college || "KIOT";
    var entryFee = (typeof fee !== "undefined") ? fee : 100;
    return { name: studentName, college: collegeName, fee: entryFee };
}
console.log("❌ Old Way Defaults:", generateTicketOld("Karthik", undefined, 0));

// ✅ NEW WAY (ES6+): Default parameter syntax directly in function signature
function generateTicketNew(name = "Guest Attendee", college = "Knowledge Institute of Technology", fee = 100) {
    return { name, college, fee };
}
console.log("✅ New Way Defaults (with fee=0 preserved):", generateTicketNew("Karthik", undefined, 0));
console.log("✅ New Way All Defaults:", generateTicketNew());

console.log("\n🎉 ALL ES5 vs ES6+ COMPARISONS COMPLETE!\n");
