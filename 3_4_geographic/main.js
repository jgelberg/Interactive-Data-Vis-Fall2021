/**
 * CONSTANTS AND GLOBALS
 * */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };
  
let svg,
  hoverBox;

/**
* APPLICATION STATE
* */
let state = {
  geojson: [],
  populations: [],
};

/**
* LOAD DATA
* Using a Promise.all([]), we can load more than one dataset at a time
* */
Promise.all([
 d3.json("../data/usState.json"),
 d3.csv("../data/statePopulations.csv")
]).then(([geojson, populations]) => {
 state.geojson = geojson;
 state.populations = populations
 console.log("state: ", state);
 init();
});

/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
function init() {

  const colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateOrRd)
    // .domain(d3.extent(state.populations.map(d => d['Total Housing Units'])))
    .domain(d3.extent(state.populations, d => d['Total Housing Units']))

  // const populationLookup = d3.group(state.populations, d => d['State'])
  // const populationLookup = d3.rollup(state.populations, v => v[0]['Total Housing Units'], d => d['State'])
  
  // const populationLookup = state.populations.map(d => [d['State'], d['Total Housing Units']])
  // let populationLookup = {};
  // state.populations.forEach(d => populationLookup[d['State']] = d['Total Housing Units'])
  
  // const populationLookup = state.populations.reduce((acc, value) => ({ 
  //   ...acc, 
  //   [value['State']]: value['Total Housing Units'] 
  // }), {})

  const populationLookup = new Map(state.populations.map(d => [
    d['State'], d['Total Housing Units']
  ]))
  // console.log('populationLookup :>> ', populationLookup.get("California"));

  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  hoverBox = d3.select("#hover-content")

  const projection = d3.geoAlbersUsa()
    .fitSize([width, height], state.geojson)
  const pathGen = d3.geoPath().projection(projection);

  const usStates = svg.selectAll("path.state")
    .data(state.geojson.features)
    .join("path")
    .attr("class", "state")
    // .attr("d", pathGen)
    .attr("d", d => pathGen(d))
    .attr("fill", (d, i) => {
      // console.log(d)
      // console.log(populationLookup.get(d.properties.NAME))
      return colorScale(+populationLookup.get(d.properties.NAME))
    })

  usStates.on("mousemove", (ev, d) => {
    // console.log('d :>> ', d);
    state.hover_state = d.properties.NAME;
    state.hover_population = populationLookup.get(d.properties.NAME)
    draw();
  })
 
  svg.on("mousemove", (ev) => {
    // console.log(d3.pointer(ev))
    // const mx = d3.pointer(ev)[0]
    // const my = d3.pointer(ev)[1]
    const [mx, my] = d3.pointer(ev)
    // console.log(ev)
    // console.log(projection.invert([mx, my]))
    state.x = ev.clientX;
    state.y = ev.clientY;
    state.latitude = projection.invert([mx, my])[0];
    state.longitude = projection.invert([mx, my])[1];
    draw();
  })

//  draw(); // calls the draw function
}

/**
* DRAW FUNCTION
* we call this every time there is an update to the data/state
* */
function draw() {
  // console.log('state :>> ', state);
  hoverBox
    .style("top", state.y + "px")
    .style("left", state.x + "px")
    .html(
      `<div>US State: ${state.hover_state}</div>
      <div>Population: ${state.hover_population}</div>
      <div>Latitude: ${state.latitude}</div>
      <div>Longitude: ${state.longitude}</div>`
    )

}