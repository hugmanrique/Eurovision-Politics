const countryCodes = require('../countries.json');

exports.getFirstYears = rows => {
  const countryFirstYears = {};

  function process(year, countryName) {
    const code = countryCodes[countryName];
    const prev = countryFirstYears[code];

    if (prev && year >= prev) {
      return;
    }

    countryFirstYears[code] = year;
  }

  rows.forEach(row => {
    const year = parseInt(row[0]);
    const from = row[4];
    const to = row[5];

    process(year, from);
    process(year, to);
  });

  return countryFirstYears;
};
