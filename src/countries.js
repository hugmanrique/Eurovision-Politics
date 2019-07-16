const countryNames = require('./data/countryNames.json');
const countryCodes = require('./data/countryCodes.json');
const neighbours = require('./data/neighbours.json');

const dissolvedCountries = ['YUG'];

exports.getCountryCode = countryName => {
  const alpha2 = countryNames[countryName];

  if (!alpha2) {
    throw new Error(`Missing ISO 3166 alpha-2 country code for ${countryName}`);
  }

  const code = countryCodes[alpha2];

  if (!code) {
    throw new Error(
      `Missing ISO 3166 alpha-3 country code for ${countryName} (${alpha2})`
    );
  }

  return code;
};

exports.areNeighbours = (aCode, bCode) => {
  const aNeighbours = neighbours[aCode];

  return aNeighbours.includes(bCode);
};

exports.getNeighbours = countryCode => neighbours[countryCode];

exports.isDissolved = countryCode => dissolvedCountries.includes(countryCode);
