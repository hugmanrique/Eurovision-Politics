/* global d3, Datamap */

const width = 1800;
const height = 900;

const mapElement = document.getElementById('map');

mapElement.style.width = `${width}px`;
mapElement.style.height = `${height}px`;

// Europe Marcator projection
const projection = d3.geo['mercator']()
  .scale(700)
  .translate([width / 2, 0])
  .center([40, 70]);

const path = d3.geo.path().projection(projection);

function createLabelData(data) {
  return new Proxy(data, {
    get(obj, prop) {
      const dataProps = Reflect.get(obj, prop);

      // Don't display labels on non-voted countries
      // and non-european countries (sorry Australia <3)
      if (!dataProps) {
        return ' ';
      }

      const score = dataProps.numberOfThings;

      return score.toFixed(1);
    }
  });
}

async function init() {
  // Fetch dataset
  const response = await fetch('scores.json');
  const data = await response.json();

  // Create color palette
  const scores = Object.values(data);
  const minValue = Math.min.apply(null, scores);
  const maxValue = Math.max.apply(null, scores);

  const paletteScale = d3.scale
    .linear()
    .domain([minValue, maxValue])
    // Tailwind CSS colors
    // https://tailwindcss.com/docs/customizing-colors#default-color-palette
    .range(['#CBD5E0', '#2C5282']);

  // Restructure data for Datamaps.js
  for (const [countryCode, score] of Object.entries(data)) {
    data[countryCode] = {
      numberOfThings: score,
      fillColor: paletteScale(score)
    };
  }

  // Create map
  const map = new Datamap({
    element: mapElement,
    setProjection: () => ({ projection, path }),
    fills: {
      defaultFill: '#CBD5E0'
    },
    data
  });

  const labelData = createLabelData(data);

  map.labels({
    labelColor: '#1A202C',
    fontSize: 12,
    customLabelText: labelData
  });
}

init();
