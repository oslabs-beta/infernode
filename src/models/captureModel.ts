import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

// Captures stack traces when handling queries. Makes it easier to debug errors resulting from
// bad queries.
sqlite3.verbose();

const dbPath: string = path.resolve(__dirname, '../../database/captureDB.db');

// Checking if db file path already exists
const dbExists: boolean = fs.existsSync(dbPath);

// For info on the node sqlite3 API and what the methods do:
// https://github.com/TryGhost/node-sqlite3/wiki/API

// Creating a new instance of the sqlite database
const captureDB = new sqlite3.Database(
  dbPath,
  // tslint:disable-next-line:no-bitwise
  // eslint-disable-next-line no-bitwise
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    // Console logs to confirm connection to the database
    if (err) {
      throw (err);
    }
  },
);

// If the db was just created, create a table for the capture information
if (!dbExists) {
  let createTableSQL = 'CREATE TABLE capture (id INTEGER PRIMARY KEY AUTOINCREMENT, capture_name';
  createTableSQL += ', date, creator, app_name, data';

  createTableSQL += ' TEXT DEFAULT "{}")';

  captureDB.run(createTableSQL, (err) => {
    if (err) {
      throw (err);
    }
  });
// Might need to add checks to make sure that the table is formatted correctly
}

export default captureDB;
