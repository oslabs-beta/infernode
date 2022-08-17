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
  //JSON can be stored as text in SQLite. Currently requiring data field, so if no data is needed, we can always convert an empt JSON object to a string
  //If it turns out we don't really need the data field, we can also get rid of it. 
  const createTableSQL: string = 'CREATE TABLE capture(id INT NOT NULL , capture_name TEXT NOT NULL, date, creator TEXT NOT NULL, app_name TEXT NOT NULL, data TEXT NOT NULL)';
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