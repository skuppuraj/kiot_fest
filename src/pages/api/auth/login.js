/**
 * ============================================================================
 * KIOT FEST - BACKEND AUTHENTICATION API ROUTE
 * ============================================================================
 * 
 * Provides static password validation for faculty and student coordinators
 * to publish and manage fest events.
 */

// Static Authorized Coordinator Accounts
const COORDINATOR_ACCOUNTS = [
  {
    username: 'admin',
    password: 'kiotfest2026',
    name: 'Dr. S. Karthi (Chief Coordinator)',
    department: 'CSE',
    role: 'Chief Faculty Coordinator'
  },
  {
    username: 'cse_coordinator',
    password: 'kiotfest2026',
    name: 'Priyadharshini S',
    department: 'CSE',
    role: 'CSE Student Lead'
  },
  {
    username: 'ece_coordinator',
    password: 'kiotfest2026',
    name: 'Prof. M. Anitha',
    department: 'ECE',
    role: 'ECE Faculty Lead'
  },
  {
    username: 'aids_coordinator',
    password: 'kiotfest2026',
    name: 'Dr. V. Rajesh',
    department: 'AI&DS',
    role: 'AI&DS HoD'
  }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Please enter both username and password' });
    }

    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    // Check against authorized coordinator database
    const matchedAccount = COORDINATOR_ACCOUNTS.find(
      (acc) => acc.username.toLowerCase() === trimmedUser && acc.password === trimmedPass
    );

    // Also support global master password fallback for the workshop
    const isMasterPasswordMatch =
      (trimmedUser === 'coordinator' || trimmedUser === 'admin' || trimmedUser.includes('@kiot.ac.in')) &&
      trimmedPass === 'kiotfest2026';

    if (matchedAccount) {
      return res.status(200).json({
        success: true,
        message: `Welcome back, ${matchedAccount.name}!`,
        token: `kiot_auth_token_${Date.now()}_${matchedAccount.username}`,
        coordinator: {
          username: matchedAccount.username,
          name: matchedAccount.name,
          department: matchedAccount.department,
          role: matchedAccount.role
        }
      });
    } else if (isMasterPasswordMatch) {
      return res.status(200).json({
        success: true,
        message: 'Welcome to KIOT Fest Coordinator Portal!',
        token: `kiot_auth_token_${Date.now()}_${trimmedUser}`,
        coordinator: {
          username: trimmedUser,
          name: 'KIOT Fest Coordinator',
          department: 'All Departments',
          role: 'Event Coordinator'
        }
      });
    } else {
      return res.status(401).json({
        error: 'Invalid coordinator credentials. Use username: "admin" and password: "kiotfest2026"'
      });
    }
  } catch (error) {
    console.error('API Error [POST /api/auth/login]:', error);
    return res.status(500).json({ error: 'Internal server error during authentication' });
  }
}
