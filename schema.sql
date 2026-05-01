-- Hospital Priority System Database Schema
CREATE DATABASE IF NOT EXISTS hospital_priority_system;
USE hospital_priority_system;

-- =====================================================
-- USERS TABLE (For Login)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DOCTORS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS doctors (
  doctor_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- ROOMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS rooms (
  room_id INT PRIMARY KEY AUTO_INCREMENT,
  room_number VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- PATIENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS patients (
  patient_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  age INT,
  category VARCHAR(100),
  priority_level INT DEFAULT 3,
  priority_label VARCHAR(50) DEFAULT 'Medium',
  doctor_id INT,
  room_id INT,
  status VARCHAR(50) DEFAULT 'Admitted',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
  FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);

-- =====================================================
-- SEED DATA: USERS (With hashed passwords using bcrypt)
-- =====================================================
-- Password: admin123 (hashed)
-- Password: doctor123 (hashed)

INSERT INTO users (email, password, role) VALUES
('admin@hospital.com', '$2b$10$KIXxPfxVIs.ZfvqPb1bIR.Rxa8pT6wc7Z8cPq7J3ZlVfM8Ib2FvC.', 'admin'),
('joe@hospital.com', '$2b$10$KIXxPfxVIs.ZfvqPb1bIR.Rxa8pT6wc7Z8cPq7J3ZlVfM8Ib2FvC.', 'doctor'),
('sarah@hospital.com', '$2b$10$KIXxPfxVIs.ZfvqPb1bIR.Rxa8pT6wc7Z8cPq7J3ZlVfM8Ib2FvC.', 'doctor'),
('mike@hospital.com', '$2b$10$KIXxPfxVIs.ZfvqPb1bIR.Rxa8pT6wc7Z8cPq7J3ZlVfM8Ib2FvC.', 'doctor');

-- =====================================================
-- SEED DATA: DOCTORS
-- =====================================================
INSERT INTO doctors (name, specialization, status) VALUES
('Dr. Joe', 'Cardiology', 'Available'),
('Dr. Sarah', 'Neurology', 'Available'),
('Dr. Mike', 'General', 'Available'),
('Dr. Emily', 'Emergency', 'Available'),
('Dr. David', 'Orthopedic', 'Available'),
('Dr. Lisa', 'Cardiology', 'Available');

-- =====================================================
-- SEED DATA: ROOMS
-- =====================================================
INSERT INTO rooms (room_number, type, status) VALUES
('101', 'General', 'Available'),
('102', 'General', 'Available'),
('103', 'General', 'Available'),
('104', 'General', 'Available'),
('105', 'ICU', 'Available'),
('106', 'ICU', 'Available'),
('107', 'Emergency', 'Available'),
('108', 'Emergency', 'Available'),
('201', 'General', 'Available'),
('202', 'General', 'Available'),
('203', 'ICU', 'Available'),
('204', 'Emergency', 'Available');

-- =====================================================
-- SEED DATA: SAMPLE PATIENTS (Optional)
-- =====================================================
INSERT INTO patients (name, age, category, priority_level, priority_label, doctor_id, room_id, status) VALUES
('John Doe', 45, 'Cardiology', 2, 'High', 1, 1, 'Admitted'),
('Jane Smith', 32, 'Neurology', 3, 'Medium', 2, 2, 'Admitted'),
('Robert Brown', 67, 'General', 1, 'Critical', 3, 5, 'Admitted');

-- =====================================================
-- VERIFY SETUP
-- =====================================================
SELECT 'Users Created:' as status, COUNT(*) as count FROM users
UNION ALL
SELECT 'Doctors Created:', COUNT(*) FROM doctors
UNION ALL
SELECT 'Rooms Created:', COUNT(*) FROM rooms
UNION ALL
SELECT 'Sample Patients:', COUNT(*) FROM patients;
