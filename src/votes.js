const { getCountryCode, isDissolved } = require('./countries');

exports.parseVotes = voteRows => {
  const countries = {};
  const firstYears = {};

  function getVoteCount(fromCode, toCode) {
    let countryVotes = countries[fromCode];

    if (!countryVotes) {
      countryVotes = countries[fromCode] = {};
    }

    return countryVotes[toCode] || 0;
  }

  function updateFirstYear(countryCode, year) {
    const prevFirstYear = firstYears[countryCode];

    if (prevFirstYear && year >= prevFirstYear) {
      return;
    }

    firstYears[countryCode] = year;
  }

  function addVotes(fromCode, toCode, points, year) {
    const count = getVoteCount(fromCode, toCode);

    // Increment from->to vote count
    countries[fromCode][toCode] = count + points;

    updateFirstYear(fromCode, year);
    updateFirstYear(toCode, year);
  }

  voteRows.forEach(row => {
    // Parse row

    const fromCountryName = row[4];
    const toCountryName = row[5];

    const fromCode = getCountryCode(fromCountryName);
    const toCode = getCountryCode(toCountryName);

    if (isDissolved(fromCode) || isDissolved(toCode)) {
      // Ignore vote
      return;
    }

    const year = parseInt(row[0]);
    const points = parseInt(row[6]);

    addVotes(fromCode, toCode, points, year);
  });

  return { countries, firstYears };
};

exports.getFinalVotes = voteRows => {
  // 'f' = final
  return voteRows.filter(row => row[1] === 'f');
};
