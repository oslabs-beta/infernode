const crypto = require('crypto');
const { readFileSync } = require('fs');
const process = require('process');

console.log(`pid: ${process.pid}`);

crypto.pbkdf2Sync(
  readFileSync(__filename),
  'example-task.js',
  10000000,
  512,
  'sha512'
);
