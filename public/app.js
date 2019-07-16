/* global d3, Datamap, neighbourVoteCount, dataset */

const height = 900;
const width = 1800;

const mapElement = document.getElementById('map');

mapElement.style.height = `${height}px`;
mapElement.style.width = `${width}px`;

const projection = d3.geo['mercator']()
  .scale(700)
  .translate([width / 2, 0])
  .center([40, 70]);

const path = d3.geo.path().projection(projection);

const map = new Datamap({
  element: document.getElementById('map'),
  //scope: 'custom',
  setProjection: () => ({ projection, path }),
  fills: {
    defaultFill: '#DBDBDD'
  },
  data: dataset
});

const labelData = new Proxy(neighbourVoteCount, {
  get(obj, prop) {
    const realValue = Reflect.get(obj, prop);

    // Don't display labels on non-voted countries
    // and non-european countries (sorry Australia <3)
    if (!realValue) {
      return ' ';
    }

    return realValue.toFixed(1);
  }
});

map.labels({
  labelColor: 'black',
  fontSize: 12,
  customLabelText: labelData
});
