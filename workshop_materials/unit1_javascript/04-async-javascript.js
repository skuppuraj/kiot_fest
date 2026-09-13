/**
 * ============================================================================
 * KIOT FEST WORKSHOP - UNIT 1: ASYNCHRONOUS JAVASCRIPT & APIs
 * Target Audience: 3rd Year CSE Students
 * ============================================================================
 * 
 * CORE TOPICS:
 * 1. Event Loop, Call Stack, Microtask & Macrotask Queue basics.
 * 2. Callback Hell problem vs Promises.
 * 3. Creating & Chaining Promises.
 * 4. async / await with robust try/catch error handling.
 * 5. fetch() API for handling JSON responses.
 */

// ----------------------------------------------------------------------------
// 1. CALL STACK & EVENT LOOP SIMULATION
// ----------------------------------------------------------------------------
console.log("=== 1. Event Loop Order Demonstration ===");
console.log("A: Synchronous code start");

setTimeout(() => {
    console.log("D: Macrotask Queue (setTimeout 0ms)");
}, 0);

Promise.resolve().then(() => {
    console.log("C: Microtask Queue (Promise.then - Higher Priority than setTimeout!)");
});

console.log("B: Synchronous code end");
// Output order will be: A -> B -> C -> D


// ----------------------------------------------------------------------------
// 2. THE PROBLEM: CALLBACK HELL (Pyramid of Doom)
// ----------------------------------------------------------------------------
// Scenario: Register student -> Check Seat Availability -> Process Fee -> Generate Pass

function legacyRegisterFlow(studentName, eventId, callback) {
    // Simulating nested callbacks with setTimeout:
    setTimeout(() => {
        console.log("\n[Callback Hell Step 1] Student details validated...");
        setTimeout(() => {
            console.log("[Callback Hell Step 2] Seat allocated in DB...");
            setTimeout(() => {
                console.log("[Callback Hell Step 3] Payment approved...");
                setTimeout(() => {
                    console.log(`[Callback Hell Step 4] QR Pass created for ${studentName}!`);
                    callback(null, "TICKET-999");
                }, 400);
            }, 400);
        }, 400);
    }, 400);
}


// ----------------------------------------------------------------------------
// 3. THE SOLUTION: PROMISES (Pending, Fulfilled, Rejected)
// ----------------------------------------------------------------------------
// Wrapping asynchronous operations in clean Promise instances:

const checkSeatAvailability = (eventId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const hasSeats = true; // Change to false to simulate rejection
            if (hasSeats) {
                resolve({ eventId, available: true, message: "Seats available" });
            } else {
                reject(new Error(`Event #${eventId} is completely booked!`));
            }
        }, 500);
    });
};

const processPayment = (amount) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (amount > 0) {
                resolve({ txnId: `TXN-${Date.now()}`, amount, status: "SUCCESS" });
            } else {
                reject(new Error("Invalid payment amount"));
            }
        }, 500);
    });
};

// Chaining Promises with .then() and .catch():
console.log("\n=== 2. Promise Chaining Flow ===");
checkSeatAvailability(101)
    .then(seatResult => {
        console.log("✅ Step 1 Success:", seatResult.message);
        return processPayment(250);
    })
    .then(paymentResult => {
        console.log("✅ Step 2 Success: Payment ID:", paymentResult.txnId);
        return { ticketNumber: "KIOT-PASS-2026-X8", status: "CONFIRMED" };
    })
    .then(ticket => {
        console.log("🎟️ Ticket Confirmed:", ticket);
    })
    .catch(error => {
        console.error("❌ Registration Failed:", error.message);
    });


// ----------------------------------------------------------------------------
// 4. MODERN ASYNC / AWAIT WITH ERROR HANDLING (TRY / CATCH)
// ----------------------------------------------------------------------------
// Async / Await is syntactic sugar over Promises, making async code read like synchronous code!

async function completeFestRegistration(student) {
    try {
        console.log(`\n=== 3. Async/Await Registration for ${student.name} ===`);
        
        // 1. Await seat check
        const seatStatus = await checkSeatAvailability(student.eventId);
        console.log("1. Checked seats:", seatStatus);

        // 2. Await payment
        const payment = await processPayment(student.fee);
        console.log("2. Payment done:", payment.txnId);

        // 3. Construct ticket pass
        const pass = {
            ticketId: `KIOT-${student.rollNo}-${student.eventId}`,
            student: student.name,
            rollNo: student.rollNo,
            event: student.eventName,
            generatedAt: new Date().toLocaleTimeString()
        };

        console.log("🎉 Final Pass Generated:", pass);
        return pass;
    } catch (err) {
        console.error("🚨 Error during registration:", err.message);
        throw err;
    } finally {
        console.log("ℹ️ Completed registration attempt for:", student.name);
    }
}

// Executing async function:
completeFestRegistration({
    name: "Raghavan K",
    rollNo: "22CS102",
    eventId: 101,
    eventName: "Web Hackathon",
    fee: 200
});


// ----------------------------------------------------------------------------
// 5. WORKING WITH FETCH() API & HANDLING JSON RESPONSES
// ----------------------------------------------------------------------------
// How React components fetch data from backend endpoints:

async function fetchFestEventsFromAPI() {
    try {
        console.log("\n=== 4. Fetch API Demonstration ===");
        // Simulating fetch or calling a public test API:
        // In Next.js/React: const res = await fetch("/api/events");
        // const data = await res.json();
        
        console.log("Fetching: /api/events...");
        // Simulated mock fetch response:
        const simulatedApiResponse = [
            { id: 1, title: "KIOT Hackathon", dept: "CSE" },
            { id: 2, title: "Drone Racing", dept: "ECE" }
        ];

        console.log("✅ Received JSON Response:", JSON.stringify(simulatedApiResponse, null, 2));
    } catch (error) {
        console.error("Failed to fetch events:", error);
    }
}

fetchFestEventsFromAPI();
