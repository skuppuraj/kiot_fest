/**
 * ============================================================================
 * KIOT FEST - DATABASE CONNECTOR (DUAL-MODE)
 * Target Audience: 3rd Year CSE Workshop
 * ============================================================================
 * 
 * 1. If MYSQL_HOST / MYSQL_USER are configured in environment / .env.local,
 *    it connects to real MySQL via `mysql2/promise`.
 * 2. If MySQL is not running or credentials are not supplied, it safely falls
 *    back to the in-memory mock store so students never get blocked.
 */

import mysql from 'mysql2/promise';
import {
  getMockEvents,
  getMockEventById,
  addMockEvent,
  addMockRegistration,
  getMockRegistrationsByRollNo
} from './mockData';

let pool = null;
let isMySqlAvailable = null;

// Initialize MySQL pool if configured
function getPool() {
  if (pool) return pool;
  
  if (process.env.MYSQL_HOST && process.env.MYSQL_USER) {
    try {
      pool = mysql.createPool({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || 'kiot_fest_db',
        port: Number(process.env.MYSQL_PORT) || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      return pool;
    } catch (e) {
      console.warn('⚠️ [DB Warning] MySQL pool creation failed. Falling back to Mock DB.');
      return null;
    }
  }
  return null;
}

/**
 * Fetch all events (with optional category / department filter)
 */
export async function getAllEvents({ department, category, search } = {}) {
  const mySqlPool = getPool();
  if (mySqlPool) {
    try {
      let query = 'SELECT * FROM events WHERE 1=1';
      const params = [];

      if (department && department !== 'ALL') {
        query += ' AND department = ?';
        params.push(department);
      }
      if (category && category !== 'ALL') {
        query += ' AND category = ?';
        params.push(category);
      }
      if (search) {
        query += ' AND (title LIKE ? OR description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }

      query += ' ORDER BY id ASC';
      const [rows] = await mySqlPool.query(query, params);
      return rows;
    } catch (err) {
      console.warn('⚠️ [MySQL Error] Query failed, falling back to mock memory store:', err.message);
    }
  }

  // In-memory fallback
  let events = getMockEvents();
  if (department && department !== 'ALL') {
    events = events.filter(e => e.department.toUpperCase() === department.toUpperCase());
  }
  if (category && category !== 'ALL') {
    events = events.filter(e => e.category.toUpperCase() === category.toUpperCase());
  }
  if (search) {
    const q = search.toLowerCase();
    events = events.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
  }
  return events;
}

/**
 * Fetch a single event by ID
 */
export async function getEventById(id) {
  const numericId = parseInt(id, 10);
  const mySqlPool = getPool();

  if (mySqlPool) {
    try {
      const [rows] = await mySqlPool.query('SELECT * FROM events WHERE id = ?', [numericId]);
      if (rows && rows.length > 0) return rows[0];
    } catch (err) {
      console.warn('⚠️ [MySQL Error] getEventById fallback:', err.message);
    }
  }

  return getMockEventById(numericId);
}

/**
 * Register a student for an event and create a pass
 */
export async function registerForEvent(regData) {
  const mySqlPool = getPool();

  if (mySqlPool) {
    try {
      const ticketCode = `KIOT-${regData.roll_no?.toUpperCase() || 'PASS'}-${regData.event_id}-${Math.floor(1000 + Math.random() * 9000)}`;
      const query = `
        INSERT INTO registrations 
        (event_id, student_name, roll_no, college, department, year_of_study, email, phone, payment_status, ticket_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed', ?)
      `;
      const [result] = await mySqlPool.query(query, [
        regData.event_id,
        regData.student_name,
        regData.roll_no,
        regData.college || 'KIOT',
        regData.department || 'CSE',
        regData.year_of_study || 3,
        regData.email,
        regData.phone,
        ticketCode
      ]);

      // Increment booked seats
      await mySqlPool.query('UPDATE events SET seats_booked = seats_booked + 1 WHERE id = ?', [regData.event_id]);

      return {
        id: result.insertId,
        ...regData,
        ticket_code: ticketCode,
        payment_status: 'Confirmed',
        registered_at: new Date().toISOString()
      };
    } catch (err) {
      console.warn('⚠️ [MySQL Error] registerForEvent fallback:', err.message);
    }
  }

  return addMockRegistration(regData);
}

/**
 * Fetch all tickets for a specific roll number
 */
export async function getTicketsByRollNo(rollNo) {
  const mySqlPool = getPool();

  if (mySqlPool) {
    try {
      const query = `
        SELECT r.*, e.title as event_title, e.date as event_date, e.time as event_time, e.venue as event_venue
        FROM registrations r
        JOIN events e ON r.event_id = e.id
        WHERE UPPER(r.roll_no) = UPPER(?)
        ORDER BY r.registered_at DESC
      `;
      const [rows] = await mySqlPool.query(query, [rollNo.trim()]);
      return rows;
    } catch (err) {
      console.warn('⚠️ [MySQL Error] getTicketsByRollNo fallback:', err.message);
    }
  }

  return getMockRegistrationsByRollNo(rollNo);
}

/**
 * Create a new event (Coordinator / Admin Portal)
 */
export async function createEvent(eventData) {
  const mySqlPool = getPool();

  if (mySqlPool) {
    try {
      const query = `
        INSERT INTO events 
        (title, department, category, description, rules, date, time, venue, team_size, registration_fee, prize_pool, seats_total, seats_booked, banner_url, coordinator_name, coordinator_phone)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)
      `;
      const [result] = await mySqlPool.query(query, [
        eventData.title,
        eventData.department,
        eventData.category,
        eventData.description,
        eventData.rules || '',
        eventData.date,
        eventData.time,
        eventData.venue,
        eventData.team_size || 1,
        eventData.registration_fee || 0,
        eventData.prize_pool || '',
        eventData.seats_total || 50,
        eventData.banner_url || '',
        eventData.coordinator_name || '',
        eventData.coordinator_phone || ''
      ]);
      return { id: result.insertId, ...eventData };
    } catch (err) {
      console.warn('⚠️ [MySQL Error] createEvent fallback:', err.message);
    }
  }

  return addMockEvent(eventData);
}
