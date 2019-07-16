const fs = require('fs');
const path = require('path');

const parseCsvFile = require('./csvParser');
const { parseVotes, getFinalVotes } = require('./votes');
const writeToFile = require('./writer');

const votesCsvPath = path.resolve('src/data/votes.csv');
const finalDataPath = path.resolve('data.json');
const firstYearsPath = path.resolve('firstYears.json');

const voteRows = parseCsvFile(votesCsvPath);
const finalVoteRows = getFinalVotes(voteRows);

const { countries: finalVotes, firstYears } = parseVotes(finalVoteRows);

writeToFile(finalDataPath, finalVotes);
writeToFile(firstYearsPath, firstYears);
