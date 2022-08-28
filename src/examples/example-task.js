const crypto = require('crypto');
const { readFileSync } = require('fs');
crypto.pbkdf2Sync(readFileSync(__filename), 'example-task.js', 1000000, 512, 'sha512');