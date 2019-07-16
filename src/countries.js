const neighbours = require('../neighbours.json');

const dissolvedCountries = ['YU'];

exports.areNeighbors = (countryA, countryB) => {
  const countryData = neighbours[countryA];

  if (!countryData) {
    console.warn(`Missing neighbor data for "${countryA}"`);
    return false;
  }

  return countryData.neighbours.includes(countryB);
};

exports.isDissolved = country => dissolvedCountries.includes(country);
