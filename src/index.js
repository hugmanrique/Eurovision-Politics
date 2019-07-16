const path = require('path');

const { parseCsvFile } = require('./parser');
const { getVoteCount } = require('./votes');
const { areNeighbors, isDissolved } = require('./countries');
const { getIsoThreeLetterCode } = require('./datamaps');
const { getFirstYears } = require('./years');

const datasetPath = path.resolve('dataset.csv');

const voteData = parseCsvFile(datasetPath);

const finals = voteData.filter(row => row[1] === 'f');
const voteCount = getVoteCount(finals);

const firstYears = getFirstYears(finals);
const lastYear = 2018;

const neighborVotes = {};

Object.entries(voteCount).forEach(([country, votes]) => {
  if (isDissolved(country)) {
    return;
  }

  Object.entries(votes).forEach(([otherCountry, countryVotes]) => {
    if (isDissolved(otherCountry)) {
      return;
    }

    if (!areNeighbors(country, otherCountry)) {
      return;
    }

    if (!neighborVotes[country]) {
      neighborVotes[country] = {};
    }

    neighborVotes[country][otherCountry] = countryVotes;
  });
});

const scores = {};
const add = (a, b) => a + b;

Object.entries(neighborVotes).forEach(([country, votes]) => {
  const countryVotes = Object.values(votes).reduce(add, 0);
  const firstYear = firstYears[country];
  const threeLetterCode = getIsoThreeLetterCode(country);

  // Neighbour vote count / years participating
  const value = countryVotes / (lastYear - firstYear);

  scores[threeLetterCode] = value;
});

console.log(scores);
