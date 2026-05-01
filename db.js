const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Create a database in the root folder
const dbPath = path.join(__dirname, 'hospital.db');
const db = new sqlite3.Database(dbPath);

// Create a promise-based execute function to mimic mysql2/promise
function execute(sql, params = []) {
  return new Promise((resolve, reject) => {
    const isSelect = sql.trim().toUpperCase().startsWith('SELECT') || sql.trim().toUpperCase().startsWith('SHOW');
    
    if (isSelect) {
      db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve([rows, []]); // mimic [result, fields]
      });
    } else {
      db.run(sql, params, function (err) {
        if (err) return reject(err);
        // mimic mysql2 insertResult
        resolve([{ insertId: this.lastID, affectedRows: this.changes }, []]);
      });
    }
  });
}

// Initialize database if it's empty
async function initializeDB() {
  try {
    const [result] = await execute("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
    if (result.length === 0) {
      console.log('Initializing SQLite Database...');
      let schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
      
      // Convert MySQL schema to SQLite compatible syntax
      schema = schema.replace(/AUTO_INCREMENT/g, 'AUTOINCREMENT');
      schema = schema.replace(/INT PRIMARY KEY AUTOINCREMENT/g, 'INTEGER PRIMARY KEY AUTOINCREMENT');
      schema = schema.replace(/CREATE DATABASE IF NOT EXISTS hospital_priority_system;/g, '');
      schema = schema.replace(/USE hospital_priority_system;/g, '');
      
      const statements = schema.split(';').map(s => s.trim()).filter(s => s.length > 0);
      for (let stmt of statements) {
        await execute(stmt);
      }
      console.log('Database Initialization Complete ✅');
    } else {
      console.log('Connected to SQLite Database ✅');
    }
  } catch (err) {
    console.error('Database Initialization failed:', err);
  }
}

initializeDB();

module.exports = {
  execute,
  connection: db
};
