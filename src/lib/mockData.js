/**
 * ============================================================================
 * KIOT FEST - IN-MEMORY MOCK DATA & REPOSITORY
 * Target Audience: 3rd Year CSE Workshop
 * ============================================================================
 * 
 * Provides pre-seeded events and an in-memory store so that the app works
 * out of the box with zero database configuration.
 */

let initialEvents = [
  {
    id: 1,
    title: "Web Hackathon 2026: NextGen Web",
    department: "CSE",
    category: "Hackathon",
    description: "Build innovative fullstack web applications using React, Next.js, and Modern APIs within 6 hours. Theme will be announced on the spot.",
    rules: "1. Max 3 members per team.\n2. Bring your own laptops.\n3. Plagiarism leads to immediate disqualification.\n4. GitHub repo must be initialized at event start.",
    date: "2026-03-25",
    time: "09:30 AM - 03:30 PM",
    venue: "CSE Central Computing Lab",
    team_size: 3,
    registration_fee: 200,
    prize_pool: "₹15,000 + Trophies",
    seats_total: 30,
    seats_booked: 24,
    banner_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    coordinator_name: "Dr. S. Karthi (Faculty)",
    coordinator_phone: "9876543210"
  },
  {
    id: 2,
    title: "Circuit Debugging & Logic Master",
    department: "ECE",
    category: "Technical",
    description: "Test your knowledge of embedded systems, PCB debugging, microcontroller programming, and digital logic circuits.",
    rules: "1. Individual or 2 per team.\n2. Round 1: Written MCQs.\n3. Round 2: Breadboard debugging.\n4. Round 3: Real-time hardware bug fix.",
    date: "2026-03-25",
    time: "10:00 AM - 01:00 PM",
    venue: "Embedded Systems Lab (Room 304)",
    team_size: 2,
    registration_fee: 100,
    prize_pool: "₹8,000",
    seats_total: 40,
    seats_booked: 15,
    banner_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    coordinator_name: "Prof. M. Anitha",
    coordinator_phone: "9876543211"
  },
  {
    id: 3,
    title: "GenAI & LLM Masterclass Workshop",
    department: "AI&DS",
    category: "Workshop",
    description: "Hands-on masterclass on building autonomous AI agents, RAG pipelines, and fine-tuning open-source LLMs using Python and LangChain.",
    rules: "1. Open to all branches.\n2. Certificate of Completion provided.\n3. Free cloud credits for all participants.",
    date: "2026-03-26",
    time: "09:00 AM - 01:00 PM",
    venue: "Auditorium Hall B",
    team_size: 1,
    registration_fee: 350,
    prize_pool: "Certificates + Swag Kit",
    seats_total: 60,
    seats_booked: 56,
    banner_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    coordinator_name: "Dr. V. Rajesh (HoD AI&DS)",
    coordinator_phone: "9876543212"
  },
  {
    id: 4,
    title: "Robo Wars: Metal Carnage",
    department: "MECH",
    category: "Technical",
    description: "Heavyweight and lightweight combat robotics tournament. Battle in a customized bulletproof arena with spinning blades and flippers.",
    rules: "1. Max 4 members per team.\n2. Bot weight limit: 15kg / 30kg.\n3. Standard wireless frequencies.\n4. Safety goggles mandatory in arena.",
    date: "2026-03-26",
    time: "11:00 AM - 04:00 PM",
    venue: "Open Air Amphitheatre",
    team_size: 4,
    registration_fee: 300,
    prize_pool: "₹25,000 + Shields",
    seats_total: 20,
    seats_booked: 20, // Sold out test case
    banner_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80",
    coordinator_name: "Prof. R. Soundar",
    coordinator_phone: "9876543213"
  },
  {
    id: 5,
    title: "Cyber Defense & Capture The Flag (CTF)",
    department: "IT",
    category: "Hackathon",
    description: "Real-world ethical hacking challenges including cryptography, web exploitation, reverse engineering, and digital forensics.",
    rules: "1. Max 2 per team.\n2. Kali Linux / Parrot OS permitted.\n3. Attacking scoring server leads to immediate ban.",
    date: "2026-03-25",
    time: "01:30 PM - 05:00 PM",
    venue: "IT Lab 2 (Kakapalayam Campus)",
    team_size: 2,
    registration_fee: 150,
    prize_pool: "₹12,000",
    seats_total: 35,
    seats_booked: 30,
    banner_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    coordinator_name: "Prof. G. Nithya",
    coordinator_phone: "9876543214"
  },
  {
    id: 6,
    title: "CAD Master 3D Modeling",
    department: "MECH",
    category: "Technical",
    description: "Design complex industrial mechanical assemblies in SolidWorks/Fusion 360 within the given constraints.",
    rules: "1. Individual entry.\n2. Software provided in CAD Lab.\n3. Evaluation based on precision and design aesthetics.",
    date: "2026-03-25",
    time: "10:30 AM - 01:30 PM",
    venue: "CAD/CAM Lab 1",
    team_size: 1,
    registration_fee: 100,
    prize_pool: "₹7,500",
    seats_total: 25,
    seats_booked: 25, // Sold out test case
    banner_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    coordinator_name: "Dr. T. Murugan",
    coordinator_phone: "9876543215"
  },
  {
    id: 7,
    title: "Bridge-O-Mania & Smart City Modeling",
    department: "CIVIL",
    category: "Technical",
    description: "Construct ultra-resilient trusses using balsa wood and popsicle sticks capable of withstanding heavy mechanical load testing.",
    rules: "1. Max 3 per team.\n2. Standard glue and materials supplied.\n3. Highest strength-to-weight ratio wins.",
    date: "2026-03-26",
    time: "10:00 AM - 02:00 PM",
    venue: "Civil Structures Lab",
    team_size: 3,
    registration_fee: 100,
    prize_pool: "₹8,000",
    seats_total: 30,
    seats_booked: 12,
    banner_url: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=800&auto=format&fit=crop&q=80",
    coordinator_name: "Prof. P. Selvaraj",
    coordinator_phone: "9876543216"
  },
  {
    id: 8,
    title: "Short Film & Fest Reel Mania",
    department: "CSE",
    category: "Non-Technical",
    description: "Shoot, edit and showcase creative 3-minute short films or fest reels capturing the spirit of college campus life.",
    rules: "1. Video duration: 2-3 minutes.\n2. HD 1080p MP4 format.\n3. Original music / licensed audio only.",
    date: "2026-03-26",
    time: "02:00 PM - 04:30 PM",
    venue: "Auditorium Main Screen",
    team_size: 3,
    registration_fee: 100,
    prize_pool: "₹6,000",
    seats_total: 25,
    seats_booked: 10,
    banner_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    coordinator_name: "Dharani V (Student Lead)",
    coordinator_phone: "9876543217"
  }
];

let initialRegistrations = [
  {
    id: 1,
    event_id: 1,
    event_title: "Web Hackathon 2026: NextGen Web",
    student_name: "Aravind K",
    roll_no: "22CS001",
    college: "Knowledge Institute of Technology",
    department: "CSE",
    year_of_study: 3,
    email: "aravind.22cs@kiot.ac.in",
    phone: "9876501234",
    payment_status: "Confirmed",
    ticket_code: "KIOT-FEST-22CS001-EVT1",
    registered_at: "2026-03-20T10:15:00Z"
  }
];

// Helper Functions
export const getMockEvents = () => [...initialEvents];

export const getMockEventById = (id) => {
  const numericId = parseInt(id, 10);
  return initialEvents.find(e => e.id === numericId) || null;
};

export const getAllEventIds = () => initialEvents.map(e => e.id);

export const addMockEvent = (eventData) => {
  const newId = initialEvents.length > 0 ? Math.max(...initialEvents.map(e => e.id)) + 1 : 1;
  const newEvent = {
    id: newId,
    seats_booked: 0,
    seats_total: Number(eventData.seats_total) || 50,
    registration_fee: Number(eventData.registration_fee) || 0,
    ...eventData
  };
  initialEvents.push(newEvent);
  return newEvent;
};

export const addMockRegistration = (regData) => {
  const event = initialEvents.find(e => e.id === parseInt(regData.event_id, 10));
  if (event) {
    event.seats_booked = Math.min(event.seats_total, event.seats_booked + 1);
  }

  const newId = initialRegistrations.length + 1;
  const ticketCode = `KIOT-${regData.roll_no?.toUpperCase() || 'PASS'}-${regData.event_id}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newRegistration = {
    id: newId,
    ...regData,
    event_title: event ? event.title : 'Fest Event',
    payment_status: 'Confirmed',
    ticket_code: ticketCode,
    registered_at: new Date().toISOString()
  };

  initialRegistrations.push(newRegistration);
  return newRegistration;
};

export const getMockRegistrationsByRollNo = (rollNo) => {
  if (!rollNo) return [];
  const normalized = rollNo.trim().toUpperCase();
  return initialRegistrations.filter(r => r.roll_no?.toUpperCase() === normalized);
};
