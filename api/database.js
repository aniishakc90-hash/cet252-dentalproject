const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("dental.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name TEXT,
      date TEXT,
      time TEXT,
      treatment TEXT
    )
  `);
});

module.exports = db;