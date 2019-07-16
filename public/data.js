/* global d3 */

// See src/index.js for generation
const neighbourVoteCount = {
  BEL: 3.1627906976744184,
  FIN: 2.186046511627907,
  FRA: 4.72093023255814,
  DEU: 5.744186046511628,
  IRL: 1.0465116279069768,
  ITA: 1.8604651162790697,
  LUX: 1.302325581395349,
  MCO: 0.18604651162790697,
  NOR: 2.2325581395348837,
  PRT: 0.9767441860465116,
  ESP: 1.8837209302325582,
  SWE: 1.697674418604651,
  CHE: 3.372093023255814,
  NLD: 1.6744186046511629,
  TUR: 1,
  GBR: 0.8372093023255814,
  AUT: 3.0238095238095237,
  GRC: 1.1904761904761905,
  DNK: 1,
  MAR: 0.02631578947368421,
  BIH: 1,
  HRV: 2.28,
  SVN: 2.56,
  EST: 1.25,
  HUN: 2.9583333333333335,
  LTU: 1.7916666666666667,
  POL: 3.375,
  ROU: 2.3333333333333335,
  RUS: 4.875,
  SVK: 0.5833333333333334,
  MKD: 2.2,
  LVA: 2.7222222222222223,
  UKR: 4.4,
  ALB: 2.357142857142857,
  AND: 0.8571428571428571,
  BLR: 4.071428571428571,
  SRB: 4.642857142857143,
  BGR: 3.3076923076923075,
  MDA: 2.230769230769231,
  ARM: 2,
  CZE: 2.090909090909091,
  GEO: 3.1818181818181817,
  MNE: 2.1818181818181817,
  AZE: 3.1,
  SMR: 1.1
};

const values = Object.values(neighbourVoteCount);
const minValue = Math.min.apply(null, values);
const maxValue = Math.max.apply(null, values);

const paletteScale = d3.scale
  .linear()
  .domain([minValue, maxValue])
  .range(['#CBD5E0', '#2C5282']);

const dataset = {};

// Fill dataset
Object.entries(neighbourVoteCount).forEach(([country, voteCount]) => {
  dataset[country] = {
    numberOfThings: voteCount,
    fillColor: paletteScale(voteCount)
  };
});
