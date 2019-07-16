const fs = require('fs');

exports.parseCsvFile = filePath => {
  const raw = fs.readFileSync(filePath, 'utf8');
  const rows = raw.split(/\r?\n/).slice(1);

  // ; delimited CSV
  return rows.map(row => row.split(';'));
};
