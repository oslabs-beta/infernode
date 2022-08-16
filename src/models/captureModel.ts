import sqlite3, { Database } from 'sqlite3';
import path from 'path';
import fs from 'fs';
//Captures stack traces when handling queries. Makes it easier to debug.

// If DB file already exists
//   try to open it
//   catch if it can't and error
//   check if there is already a capture table
//   if not, error
// If DB file does not exist
//   try to create it
//   catch if it can't and error
//   try to create a capture table
//   if it can't, error
sqlite3.verbose();
const dbPath: string = path.resolve(__dirname, '../../database/captureInfo.db')
console.log(`SQLite3 DB path: ${dbPath}`);

let captureDB: Database;
let dbExists: boolean = fs.existsSync(dbPath);

if (dbExists) {
  console.log('Using existing DB');
}
else {
  console.log('No existing DB, creating new DB');
}

captureDB = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log("Error occurred when connecting to the database: ", err);
  }
  else {
    console.log('Connected to database');
  }
});

if (!dbExists) {
  console.log('Creating capture table in newly created DB');
  const createTableSQL: string = 'CREATE TABLE capture(id, capture_name, date, creator, app_name, data)';
  captureDB.run(createTableSQL, (err) => {
    if (err) {
      console.log('Error occurred when creating a table in the database.');
    }
  });
} else {
  console.log('Using existing capture table: ');
  captureDB.all(`SELECT * FROM capture`, (err, rows) => {
    rows.forEach(el => {
      console.log(el);
    })
  });
}


export default captureDB;