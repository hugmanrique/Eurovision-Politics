const path = require('path');
const { areNeighbours, getNeighbours } = require('../countries');
const writeToFile = require('../writer');

const scoresPath = path.resolve('public/scores.json');

// Make sure to execute `npm run createData` first
const data = require('../../data.json');
const firstYears = require('../../firstYears.json');

const lastYear = 2018;
const neighbourVotes = {};

function addNeighbourVotes(countryCode, voteCount) {
  const previous = neighbourVotes[countryCode] || 0;

  neighbourVotes[countryCode] = previous + voteCount;
}

for (const [countryCode, votes] of Object.entries(data)) {
  for (const [otherCountryCode, voteCount] of Object.entries(votes)) {
    if (!areNeighbours(countryCode, otherCountryCode)) {
      continue;
    }

    // Increment neighbour vote count
    addNeighbourVotes(countryCode, voteCount);
  }
}

// Calculate scores
const scores = {};

for (const [countryCode, neighbourVoteCount] of Object.entries(
  neighbourVotes
)) {
  const firstYear = firstYears[countryCode];
  const yearsParticipating = lastYear - firstYear + 1;

  const neighbourCount = getNeighbours(countryCode).length;

  const score = neighbourVoteCount / (yearsParticipating * neighbourCount);

  scores[countryCode] = score;
}

writeToFile(scoresPath, scores);
