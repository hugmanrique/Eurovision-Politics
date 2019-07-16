const fs = require('fs');

module.exports = filePath => {
  const raw = fs.readFileSync(filePath, 'utf8');
  const rows = raw.split(/\r?\n/).slice(1); // Skip header row

  // semicolon delimited CSV
  return rows.map(row => row.split(';'));
};
