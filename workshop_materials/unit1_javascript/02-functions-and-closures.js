/**
 * ============================================================================
 * KIOT FEST WORKSHOP - UNIT 1: FUNCTIONS, CALLBACKS & CLOSURES
 * Target Audience: 3rd Year CSE Students
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. FIRST-CLASS FUNCTIONS & HIGHER-ORDER FUNCTIONS (HOF)
// ----------------------------------------------------------------------------
// In JS, functions are First-Class Citizens: they can be stored in variables,
// passed as arguments to other functions, and returned from functions.

// Higher-order function: Takes a function as argument
function validateRegistration(student, validatorCallback) {
    const isValid = validatorCallback(student);
    if (isValid) {
        console.log(`✅ [Approved] ${student.name} is eligible for ${student.event}`);
    } else {
        console.log(`❌ [Rejected] ${student.name} did not meet eligibility criteria.`);
    }
}

// Validator 1: Check 3rd-year CSE eligibility
const isThirdYearCSE = student => student.department === "CSE" && student.year === 3;

// Validator 2: Check minimum CGPA for Hackathon
const hasGoodCgpa = student => student.cgpa >= 7.5;

const candidate1 = { name: "Sneha", department: "CSE", year: 3, cgpa: 8.4, event: "Web Hackathon" };
const candidate2 = { name: "Manoj", department: "MECH", year: 2, cgpa: 6.8, event: "AI Challenge" };

validateRegistration(candidate1, isThirdYearCSE);
validateRegistration(candidate2, isThirdYearCSE);
validateRegistration(candidate1, hasGoodCgpa);


// ----------------------------------------------------------------------------
// 2. CALLBACK FUNCTIONS (Synchronous vs Asynchronous)
// ----------------------------------------------------------------------------
// A callback is a function passed into another function to be executed later.

// Synchronous Callback (e.g. forEach, custom processors)
const participants = ["Karthik", "Abinaya", "Gokul", "Nandhini"];
participants.forEach((name, index) => {
    console.log(`Badge #${index + 1}: ${name} (KIOT)`);
});

// Asynchronous Callback (Simulating timer / event registration notification)
console.log("1. Student clicks Register button");
setTimeout(() => {
    console.log("3. [Async Callback] SMS confirmation sent to student after 2 seconds!");
}, 2000);
console.log("2. UI continues rendering other event cards smoothly (Non-blocking)");


// ----------------------------------------------------------------------------
// 3. CLOSURES (Lexical Scoping & State Preservation)
// ----------------------------------------------------------------------------
// Definition: A closure is the combination of a function bundled together with
// references to its lexical environment. A closure gives an inner function
// access to an outer function's scope even after the outer function has closed.

// Real-world Fest Example: Event Seat Counter Generator
function createEventSeatTracker(eventTitle, initialSeats) {
    let availableSeats = initialSeats; // Private state enclosed in closure

    return {
        bookSeat: function(studentName) {
            if (availableSeats > 0) {
                availableSeats--;
                console.log(`🎉 ${studentName} booked for "${eventTitle}". Remaining seats: ${availableSeats}`);
                return true;
            } else {
                console.log(`⚠️ Housefull! No seats left for "${eventTitle}".`);
                return false;
            }
        },
        getAvailableSeats: function() {
            return availableSeats;
        },
        cancelSeat: function() {
            availableSeats++;
            console.log(`Seat freed up for "${eventTitle}". Current seats: ${availableSeats}`);
        }
    };
}

// Creating separate isolated trackers using closures:
const hackathonTracker = createEventSeatTracker("KIOT Hack-O-Mania", 3);
const workshopTracker = createEventSeatTracker("Cloud Computing Workshop", 50);

hackathonTracker.bookSeat("Praveen");
hackathonTracker.bookSeat("Swetha");
hackathonTracker.bookSeat("Arun");
hackathonTracker.bookSeat("Dinesh"); // Should trigger Housefull!

console.log("Hackathon available seats:", hackathonTracker.getAvailableSeats()); // 0
console.log("Workshop available seats (Independent closure state):", workshopTracker.getAvailableSeats()); // 50


// ----------------------------------------------------------------------------
// 4. ANONYMOUS vs NAMED FUNCTIONS & IIFE
// ----------------------------------------------------------------------------
// Named function (easier to debug in stack traces)
const calculateDiscount = function applyFestEarlyBirdDiscount(fee) {
    return fee * 0.8; // 20% discount
};

// Immediately Invoked Function Expression (IIFE)
// Used in legacy JS to prevent global namespace pollution
(function initializeFestTheme() {
    const festThemeColor = "#6366f1"; // Indigo
    console.log("Fest theme initialized to:", festThemeColor);
})();
