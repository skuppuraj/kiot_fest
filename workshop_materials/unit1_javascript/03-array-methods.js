/**
 * ============================================================================
 * KIOT FEST WORKSHOP - UNIT 1: ADVANCED ARRAY METHODS (MAP, FILTER, REDUCE)
 * Target Audience: 3rd Year CSE Students
 * ============================================================================
 * 
 * WHY IS THIS CRITICAL FOR REACT?
 * - Array.map() is how we render JSX lists in React: {events.map(e => <EventCard key={e.id} ... />)}
 * - Array.filter() is how we filter search results and department categories.
 * - Array.reduce() is how we compute total registration costs and prize statistics.
 */

const kiotEvents = [
    { id: 1, title: "Web Hackathon", dept: "CSE", category: "Hackathon", fee: 200, prize: 15000, seatsLeft: 5 },
    { id: 2, title: "Circuit Debugging", dept: "ECE", category: "Technical", fee: 100, prize: 5000, seatsLeft: 12 },
    { id: 3, title: "CAD Master 3D", dept: "MECH", category: "Technical", fee: 150, prize: 7500, seatsLeft: 0 },
    { id: 4, title: "AI Prompt Battle", dept: "AI&DS", category: "Hackathon", fee: 200, prize: 12000, seatsLeft: 8 },
    { id: 5, title: "Cloud DevOps Workshop", dept: "CSE", category: "Workshop", fee: 350, prize: 0, seatsLeft: 25 },
    { id: 6, title: "Surveying Drone Challenge", dept: "CIVIL", category: "Technical", fee: 100, prize: 6000, seatsLeft: 15 },
    { id: 7, title: "Cyber Escape Room", dept: "IT", category: "Technical", fee: 150, prize: 8000, seatsLeft: 2 }
];

// ----------------------------------------------------------------------------
// 1. ARRAY.MAP() -> Transform Every Element into a New Element
// ----------------------------------------------------------------------------
// Simulating how React generates UI cards:
const eventSummaryCards = kiotEvents.map(event => {
    return {
        cardTitle: `${event.title} (${event.dept})`,
        status: event.seatsLeft > 0 ? `🟢 ${event.seatsLeft} Seats Open` : "🔴 SOLD OUT",
        registrationTag: `₹${event.fee}`
    };
});
console.log("--- Transformed Event Cards (Map) ---");
console.table(eventSummaryCards);


// ----------------------------------------------------------------------------
// 2. ARRAY.FILTER() -> Select Elements Matching a Boolean Condition
// ----------------------------------------------------------------------------
// Problem 1: User clicks the "CSE" department filter button:
const cseEventsOnly = kiotEvents.filter(event => event.dept === "CSE");
console.log("\n--- CSE Department Events (Filter) ---");
console.log(cseEventsOnly.map(e => e.title));

// Problem 2: Filter all active Hackathons with available seats:
const openHackathons = kiotEvents.filter(
    event => event.category === "Hackathon" && event.seatsLeft > 0
);
console.log("\n--- Open Hackathons with Available Seats ---");
console.log(openHackathons.map(e => `${e.title} (₹${e.prize} Prize)`));


// ----------------------------------------------------------------------------
// 3. ARRAY.REDUCE() -> Accumulate Array Elements into a Single Value
// ----------------------------------------------------------------------------
// Problem 1: Calculate Total Fest Prize Pool across all events:
const totalFestPrizePool = kiotEvents.reduce((accumulatedPrize, currentEvent) => {
    return accumulatedPrize + currentEvent.prize;
}, 0);
console.log(`\n🏆 Total KIOT Fest Prize Pool: ₹${totalFestPrizePool.toLocaleString("en-IN")}`);

// Problem 2: Group events by Department (Crucial for categorized UI rendering):
const eventsByDepartment = kiotEvents.reduce((grouped, event) => {
    const dept = event.dept;
    if (!grouped[dept]) {
        grouped[dept] = [];
    }
    grouped[dept].push(event.title);
    return grouped;
}, {});

console.log("\n--- Events Grouped by Department (Reduce) ---");
console.log(eventsByDepartment);


// ----------------------------------------------------------------------------
// 4. FIND, SOME, EVERY, SORT (Complementary Array Methods)
// ----------------------------------------------------------------------------
// find(): Locate specific event by ID (Dynamic Route /events/:id)
const eventDetail = kiotEvents.find(e => e.id === 4);
console.log("\nFound Event by ID 4:", eventDetail?.title);

// some(): Are there any free events?
const hasFreeEvents = kiotEvents.some(e => e.fee === 0);
console.log("Has free events?:", hasFreeEvents);

// every(): Do all events have prizes?
const allEventsHavePrizes = kiotEvents.every(e => e.prize > 0);
console.log("All events have prize?:", allEventsHavePrizes);

// sort(): High-to-Low Prize Pool (Immutably sorting with spread)
const sortedByPrize = [...kiotEvents].sort((a, b) => b.prize - a.prize);
console.log("\nTop 3 Highest Prize Events:");
sortedByPrize.slice(0, 3).forEach((e, idx) => console.log(`${idx + 1}. ${e.title}: ₹${e.prize}`));
