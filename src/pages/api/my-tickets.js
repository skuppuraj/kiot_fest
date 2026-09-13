import { getTicketsByRollNo } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { roll_no } = req.query;

    if (!roll_no) {
      return res.status(400).json({ error: 'Please provide roll_no query parameter' });
    }

    const tickets = await getTicketsByRollNo(roll_no);
    return res.status(200).json(tickets);
  } catch (error) {
    console.error('API Error [GET /api/my-tickets]:', error);
    return res.status(500).json({ error: 'Failed to retrieve tickets' });
  }
}
