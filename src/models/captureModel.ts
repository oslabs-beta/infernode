import sqlite3, { Database } from 'sqlite3';
import path from 'path';
import fs from 'fs';

//Captures stack traces when handling queries. Makes it easier to debug errors resulting from 
//bad queries.
sqlite3.verbose();

const dbPath: string = path.resolve(__dirname, '../../database/captureDB.db')
console.log(`SQLite3 DB path: ${dbPath}`);

//Creating variable for capture database
let captureDB: Database;

//Checking if db file path already exists
let dbExists: boolean = fs.existsSync(dbPath);

//For info on the node sqlite3 API and what the methods do:
//https://github.com/TryGhost/node-sqlite3/wiki/API

//Creating a new instance of the sqlite database
captureDB = new sqlite3.Database(
  dbPath, 
  // tslint:disable-next-line:no-bitwise
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, 
  (err) => {
    //Console logs to confirm connection to the database
    if (err) {
      console.log("Error occurred when connecting to the database: ", err);
    }
    else {
      console.log('Connected to database');
    }
  }
);

//If the db was just created, create a table for the capture information
if (!dbExists) {
  console.log('Creating capture table in newly created DB');
  
  let createTableSQL: string = 'CREATE TABLE capture(id INT NOT NULL, capture_name TEXT NOT ';
  createTableSQL += 'NULL, date, creator TEXT NOT NULL, app_name TEXT NOT NULL, data';
  createTableSQL += ' TEXT NOT NULL)'

  captureDB.run(createTableSQL, (err) => {
    if (err) {
      console.log('Error occurred when creating a table in the database.');
    }
  });
}
//If the db already exists, console log the contents
//Might need to add checks to make sure that the table is formatted correctly
else {
  console.log('Using existing capture table: ');
  captureDB.all(`SELECT * FROM capture`, (err, rows) => {
    //console logging the existing rows in the database
    rows.forEach(el => {
      console.log(el);
    })
  });
}


export default captureDB;