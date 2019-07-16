const countryCodes = require('../countries.json');

exports.getVoteCount = voteRows => {
  const voteCount = {};

  function getVoteCount(country) {
    if (!voteCount[country]) {
      voteCount[country] = {};
    }

    return voteCount[country];
  }

  function addVote(countryFrom, countryTo) {
    const votes = getVoteCount(countryFrom);
    const current = votes[countryTo] || 0;

    votes[countryTo] = current + 1;
  }

  voteRows.forEach(row => {
    const displayFrom = row[4];
    const displayTo = row[5];

    const countryFrom = countryCodes[displayFrom];
    const countryTo = countryCodes[displayTo];

    if (!countryFrom) {
      console.warn(`Missing country code for "${displayFrom}"`);
      return;
    }

    if (!countryTo) {
      console.warn(`Missing country code for "${displayTo}"`);
      return;
    }

    addVote(countryFrom, countryTo);
  });

  return voteCount;
};
