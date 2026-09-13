-- ============================================================================
-- KIOT FEST DATABASE SCHEMA
-- Target Database: MySQL 8.0+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS kiot_fest_db;
USE kiot_fest_db;

-- 1. Events Table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL, -- 'CSE', 'IT', 'AI&DS', 'ECE', 'MECH', 'CIVIL'
    category VARCHAR(50) NOT NULL,    -- 'Technical', 'Non-Technical', 'Workshop', 'Hackathon'
    description TEXT NOT NULL,
    rules TEXT,
    date DATE NOT NULL,
    time VARCHAR(50) NOT NULL,
    venue VARCHAR(150) NOT NULL,
    team_size INT DEFAULT 1,
    registration_fee DECIMAL(10,2) DEFAULT 0.00,
    prize_pool VARCHAR(100),
    seats_total INT DEFAULT 50,
    seats_booked INT DEFAULT 0,
    banner_url VARCHAR(500),
    coordinator_name VARCHAR(150),
    coordinator_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Registrations / Passes Table
CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    roll_no VARCHAR(50) NOT NULL,
    college VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    year_of_study INT NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'Confirmed',
    ticket_code VARCHAR(100) UNIQUE NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Indexing for Fast Querying & Search
CREATE INDEX idx_events_dept ON events(department);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_registrations_rollno ON registrations(roll_no);
CREATE INDEX idx_registrations_ticket ON registrations(ticket_code);
