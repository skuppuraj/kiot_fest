import { getAllEvents, createEvent } from '../../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        const { department, category, search } = req.query;
        const events = await getAllEvents({ department, category, search });
        return res.status(200).json(events);
      } catch (error) {
        console.error('API Error [GET /api/events]:', error);
        return res.status(500).json({ error: 'Failed to fetch fest events' });
      }
    }

    case 'POST': {
      try {
        const body = req.body;
        if (!body.title || !body.department || !body.category || !body.date) {
          return res.status(400).json({ error: 'Missing required event fields' });
        }

        const newEvent = await createEvent(body);
        return res.status(201).json(newEvent);
      } catch (error) {
        console.error('API Error [POST /api/events]:', error);
        return res.status(500).json({ error: 'Failed to create new event' });
      }
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
