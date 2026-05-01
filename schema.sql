-- Hospital Priority System Database Schema

-- =====================================================
-- USERS TABLE (For Login)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) DEFAULT 'Unknown',
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
  phone VARCHAR(20),
  email VARCHAR(100),
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
-- SEED DATA: USERS
-- =====================================================
INSERT INTO users (name, email, password, role) VALUES
('Admin Dr. Rajesh', 'admin@hospital.com', '$2b$10$KIXxPfxVIs.ZfvqPb1bIR.Rxa8pT6wc7Z8cPq7J3ZlVfM8Ib2FvC.', 'admin'),
('Dr. Anil Kumar',   'joe@hospital.com',   '$2b$10$KIXxPfxVIs.ZfvqPb1bIR.Rxa8pT6wc7Z8cPq7J3ZlVfM8Ib2FvC.', 'doctor'),
('Dr. Priya Sharma', 'sarah@hospital.com', '$2b$10$KIXxPfxVIs.ZfvqPb1bIR.Rxa8pT6wc7Z8cPq7J3ZlVfM8Ib2FvC.', 'doctor'),
('Dr. Vikram Singh', 'mike@hospital.com',  '$2b$10$KIXxPfxVIs.ZfvqPb1bIR.Rxa8pT6wc7Z8cPq7J3ZlVfM8Ib2FvC.', 'doctor');

-- =====================================================
-- SEED DATA: 50 INDIAN DOCTORS
-- =====================================================
INSERT INTO doctors (name, specialization, status, phone, email) VALUES
('Dr. Rajesh Kumar',      'Cardiology',      'Available', '+91-98201-11001', 'rajesh.kumar@smarthospital.in'),
('Dr. Priya Sharma',      'Cardiology',      'Available', '+91-98201-11002', 'priya.sharma@smarthospital.in'),
('Dr. Anil Mehta',        'Cardiology',      'Busy',      '+91-98201-11003', 'anil.mehta@smarthospital.in'),
('Dr. Sunita Reddy',      'Cardiology',      'Available', '+91-98201-11004', 'sunita.reddy@smarthospital.in'),
('Dr. Vikas Gupta',       'Cardiology',      'Available', '+91-98201-11005', 'vikas.gupta@smarthospital.in'),
('Dr. Meera Nair',        'Neurology',       'Available', '+91-98201-11006', 'meera.nair@smarthospital.in'),
('Dr. Arjun Patel',       'Neurology',       'Busy',      '+91-98201-11007', 'arjun.patel@smarthospital.in'),
('Dr. Kavita Iyer',       'Neurology',       'Available', '+91-98201-11008', 'kavita.iyer@smarthospital.in'),
('Dr. Suresh Rao',        'Neurology',       'Available', '+91-98201-11009', 'suresh.rao@smarthospital.in'),
('Dr. Neha Joshi',        'Neurology',       'Available', '+91-98201-11010', 'neha.joshi@smarthospital.in'),
('Dr. Vikram Singh',      'Orthopedic',      'Available', '+91-98201-11011', 'vikram.singh@smarthospital.in'),
('Dr. Anjali Desai',      'Orthopedic',      'Busy',      '+91-98201-11012', 'anjali.desai@smarthospital.in'),
('Dr. Ravi Shankar',      'Orthopedic',      'Available', '+91-98201-11013', 'ravi.shankar@smarthospital.in'),
('Dr. Pooja Verma',       'Orthopedic',      'Available', '+91-98201-11014', 'pooja.verma@smarthospital.in'),
('Dr. Sanjay Kapoor',     'Orthopedic',      'Available', '+91-98201-11015', 'sanjay.kapoor@smarthospital.in'),
('Dr. Lakshmi Menon',     'General',         'Available', '+91-98201-11016', 'lakshmi.menon@smarthospital.in'),
('Dr. Deepak Trivedi',    'General',         'Busy',      '+91-98201-11017', 'deepak.trivedi@smarthospital.in'),
('Dr. Rekha Pillai',      'General',         'Available', '+91-98201-11018', 'rekha.pillai@smarthospital.in'),
('Dr. Sunil Agarwal',     'General',         'Available', '+91-98201-11019', 'sunil.agarwal@smarthospital.in'),
('Dr. Geeta Bose',        'General',         'Available', '+91-98201-11020', 'geeta.bose@smarthospital.in'),
('Dr. Kiran Rao',         'Emergency',       'Available', '+91-98201-11021', 'kiran.rao@smarthospital.in'),
('Dr. Ramesh Yadav',      'Emergency',       'Busy',      '+91-98201-11022', 'ramesh.yadav@smarthospital.in'),
('Dr. Anita Chandra',     'Emergency',       'Available', '+91-98201-11023', 'anita.chandra@smarthospital.in'),
('Dr. Mohan Lal',         'Emergency',       'Available', '+91-98201-11024', 'mohan.lal@smarthospital.in'),
('Dr. Shanti Krishnan',   'Emergency',       'Available', '+91-98201-11025', 'shanti.krishnan@smarthospital.in'),
('Dr. Tarun Bhatt',       'Dermatology',     'Available', '+91-98201-11026', 'tarun.bhatt@smarthospital.in'),
('Dr. Usha Saxena',       'Dermatology',     'Available', '+91-98201-11027', 'usha.saxena@smarthospital.in'),
('Dr. Pankaj Mishra',     'Dermatology',     'Busy',      '+91-98201-11028', 'pankaj.mishra@smarthospital.in'),
('Dr. Savita Ghosh',      'Dermatology',     'Available', '+91-98201-11029', 'savita.ghosh@smarthospital.in'),
('Dr. Naresh Tiwari',     'Dermatology',     'Available', '+91-98201-11030', 'naresh.tiwari@smarthospital.in'),
('Dr. Hema Kulkarni',     'Pediatrics',      'Available', '+91-98201-11031', 'hema.kulkarni@smarthospital.in'),
('Dr. Aditya Shetty',     'Pediatrics',      'Busy',      '+91-98201-11032', 'aditya.shetty@smarthospital.in'),
('Dr. Chitra Mukherjee',  'Pediatrics',      'Available', '+91-98201-11033', 'chitra.mukherjee@smarthospital.in'),
('Dr. Dinesh Parekh',     'Pediatrics',      'Available', '+91-98201-11034', 'dinesh.parekh@smarthospital.in'),
('Dr. Falguni Shah',      'Pediatrics',      'Available', '+91-98201-11035', 'falguni.shah@smarthospital.in'),
('Dr. Girish Nambiar',    'Gynecology',      'Available', '+91-98201-11036', 'girish.nambiar@smarthospital.in'),
('Dr. Indira Rajan',      'Gynecology',      'Available', '+91-98201-11037', 'indira.rajan@smarthospital.in'),
('Dr. Jyoti Wagh',        'Gynecology',      'Busy',      '+91-98201-11038', 'jyoti.wagh@smarthospital.in'),
('Dr. Kamala Dubey',      'Gynecology',      'Available', '+91-98201-11039', 'kamala.dubey@smarthospital.in'),
('Dr. Lata Patil',        'Gynecology',      'Available', '+91-98201-11040', 'lata.patil@smarthospital.in'),
('Dr. Mahesh Pandey',     'Ophthalmology',   'Available', '+91-98201-11041', 'mahesh.pandey@smarthospital.in'),
('Dr. Nalini Hegde',      'Ophthalmology',   'Available', '+91-98201-11042', 'nalini.hegde@smarthospital.in'),
('Dr. Om Prakash',        'Ophthalmology',   'Busy',      '+91-98201-11043', 'om.prakash@smarthospital.in'),
('Dr. Padma Reddiar',     'Ophthalmology',   'Available', '+91-98201-11044', 'padma.reddiar@smarthospital.in'),
('Dr. Qasim Ali',         'Ophthalmology',   'Available', '+91-98201-11045', 'qasim.ali@smarthospital.in'),
('Dr. Rashmi Jain',       'Psychiatry',      'Available', '+91-98201-11046', 'rashmi.jain@smarthospital.in'),
('Dr. Sachin Thakur',     'Psychiatry',      'Available', '+91-98201-11047', 'sachin.thakur@smarthospital.in'),
('Dr. Tanuja Bhosle',     'Psychiatry',      'Busy',      '+91-98201-11048', 'tanuja.bhosle@smarthospital.in'),
('Dr. Umesh Karnik',      'Psychiatry',      'Available', '+91-98201-11049', 'umesh.karnik@smarthospital.in'),
('Dr. Vandana Sinha',     'Psychiatry',      'Available', '+91-98201-11050', 'vandana.sinha@smarthospital.in');

-- =====================================================
-- SEED DATA: 50 ROOMS
-- =====================================================
INSERT INTO rooms (room_number, type, status) VALUES
('101', 'General',   'Available'),
('102', 'General',   'Available'),
('103', 'General',   'Available'),
('104', 'General',   'Available'),
('105', 'General',   'Available'),
('106', 'General',   'Available'),
('107', 'General',   'Available'),
('108', 'General',   'Available'),
('109', 'General',   'Available'),
('110', 'General',   'Available'),
('111', 'General',   'Available'),
('112', 'General',   'Available'),
('113', 'General',   'Available'),
('114', 'General',   'Available'),
('115', 'General',   'Available'),
('116', 'General',   'Available'),
('117', 'General',   'Available'),
('118', 'General',   'Available'),
('119', 'General',   'Available'),
('120', 'General',   'Available'),
('201', 'ICU',       'Available'),
('202', 'ICU',       'Available'),
('203', 'ICU',       'Available'),
('204', 'ICU',       'Available'),
('205', 'ICU',       'Available'),
('206', 'ICU',       'Available'),
('207', 'ICU',       'Available'),
('208', 'ICU',       'Available'),
('209', 'ICU',       'Available'),
('210', 'ICU',       'Available'),
('301', 'Emergency', 'Available'),
('302', 'Emergency', 'Available'),
('303', 'Emergency', 'Available'),
('304', 'Emergency', 'Available'),
('305', 'Emergency', 'Available'),
('306', 'Emergency', 'Available'),
('307', 'Emergency', 'Available'),
('308', 'Emergency', 'Available'),
('309', 'Emergency', 'Available'),
('310', 'Emergency', 'Available'),
('401', 'General',   'Available'),
('402', 'General',   'Available'),
('403', 'General',   'Available'),
('404', 'General',   'Available'),
('405', 'General',   'Available'),
('406', 'General',   'Available'),
('407', 'ICU',       'Available'),
('408', 'ICU',       'Available'),
('409', 'Emergency', 'Available'),
('410', 'Emergency', 'Available');
