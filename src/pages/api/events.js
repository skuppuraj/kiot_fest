import { PRESCHOOL_EVENTS, SCHEDULE_DATA } from '../../data/preschoolEvents';

// Real mock API endpoint for client-side CSR demonstration
// Returns symposium events and schedule data as JSON with realistic backend processing delay
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Realistic server-side latency (~350ms) representing database query execution
  // This makes the client-side network request and loading skeleton visible in DevTools
  await new Promise((resolve) => setTimeout(resolve, 350));

  const serverTimestamp = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return res.status(200).json({
    success: true,
    source: 'KIOT Fest Mock API (/api/events)',
    serverTimestamp,
    events: PRESCHOOL_EVENTS,
    schedule: SCHEDULE_DATA,
  });
}
