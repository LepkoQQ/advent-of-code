const fs = require('fs');

function readToString(filename) {
  return fs.readFileSync(filename, 'utf-8');
}

module.exports = {
  readToString,
};
