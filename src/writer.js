const fs = require('fs');

module.exports = (filePath, data) => {
  const raw = JSON.stringify(data);

  fs.writeFileSync(filePath, raw);
};
