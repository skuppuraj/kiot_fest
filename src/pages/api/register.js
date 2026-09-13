import { registerForEvent, getEventById } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const {
      event_id,
      student_name,
      roll_no,
      college,
      department,
      year_of_study,
      email,
      phone
    } = req.body;

    if (!event_id || !student_name || !roll_no || !email || !phone) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Verify seat availability
    const event = await getEventById(event_id);
    if (!event) {
      return res.status(404).json({ error: 'Event does not exist' });
    }

    if (Number(event.seats_booked) >= Number(event.seats_total)) {
      return res.status(400).json({ error: 'Sorry, this event is already sold out!' });
    }

    const registration = await registerForEvent({
      event_id,
      student_name,
      roll_no,
      college: college || 'KIOT',
      department: department || 'CSE',
      year_of_study: Number(year_of_study) || 3,
      email,
      phone
    });

    return res.status(201).json({
      success: true,
      message: 'Registration confirmed successfully!',
      event_title: event.title,
      event_date: event.date,
      event_time: event.time,
      event_venue: event.venue,
      ...registration
    });
  } catch (error) {
    console.error('API Error [POST /api/register]:', error);
    return res.status(500).json({ error: 'Registration failed due to a server error' });
  }
}
