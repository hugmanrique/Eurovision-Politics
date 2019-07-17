const path = require('path');
const { areNeighbours, getNeighbours } = require('../countries');
const writeToFile = require('../writer');

const scoresPath = path.resolve('public/scores.json');

// Make sure to execute `npm run createData` first
const data = require('../../data.json');

const scores = {};

function addVotes(countryCode, voteCount, neighbours) {
  const previous = data[countryCode] || [0, 0];

  if (neighbours) {
    previous[0] += voteCount;
  }

  previous[1] += voteCount;

  data[countryCode] = previous;
}

for (const [countryCode, votes] of Object.entries(data)) {
  for (const [otherCountryCode, voteCount] of Object.entries(votes)) {
    const neighbours = areNeighbours(countryCode, otherCountryCode);

    addVotes(countryCode, voteCount, neighbours);
  }
}

// Calculate percentages
for (const [countryCode, components] of Object.entries(data)) {
  data[countryCode] = components[0] / components[1];
}

writeToFile(scoresPath, scores);
