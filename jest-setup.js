process.env.EXPRESS_PORT = 8378;
module.exports = () => {
  global.testServer = require('./dist/index.js');
};