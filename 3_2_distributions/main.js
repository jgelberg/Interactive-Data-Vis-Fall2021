/* CONSTANTS AND GLOBALS */
const width = 500,
  height = 300,
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let xAxis;
let xAxisGroup;
let yAxis;
let yAxisGroup;
let colorScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedParty: "All" // + YOUR INITIAL FILTER SELECTION
};

// let data;

/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType).then(raw_data => {
  // save our data to application state
  // console.log('state :>> ', state);
  state.data = raw_data;
  // data = raw_data
  console.log('state :>> ', state);
  init();
});

/* INITIALIZING FUNCTION */
function init() {
  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.ideologyScore2020))
    .range([20, width - 20])

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.envScore2020))
    .range([height - 20, 20])

  xAxis = d3.axisBottom(xScale)
  yAxis = d3.axisLeft(yScale)

  colorScale = d3.scaleOrdinal()
    .domain(["R", "D", "I"])
    .range(["red", "blue", "purple"])


  const selectElement = d3.select("#dropdown")

  selectElement
    .selectAll("option")
    .data([
      { key: "All", label: "Both Parties" },
      { key: "R", label: "Republican" },
      { key: "D", label: "Democrat" },
    ])
    // .data(Array.from(new Set(state.data.map(d => d.Party))))
    .join("option")
    // .attr("value", d => d)
    // .text(d => d)
    .attr("value", d => d.key)
    .text(d => d.label)

  selectElement.on("change", event => {
    state.selectedParty = event.target.value
    // console.log('state :>> ', state);
    draw();
  })

  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  xAxisGroup = svg.append("g")
    .attr("class", 'xAxis')
    .attr("transform", `translate(${0}, ${height - 20})`) // move to the bottom
    .call(xAxis)

  yAxisGroup = svg.append("g")
    .attr("class", 'yAxis')
    .attr("transform", `translate(${20}, ${0})`) // align with left margin
    .call(yAxis)

  draw(); 
}

/* DRAW FUNCTION */
function draw() {

  /* have to make a copy of the scale, or else it will just point to the same
  reference that gets updated in just a few lines */
  let prevXScale = xScale.copy();
  let prevYScale = yScale.copy();

  const filteredData = state.data.filter(d => 
    state.selectedParty === "All" || d.Party === state.selectedParty
  )
  // console.log('filteredData :>> ', filteredData);

  // xScale = d3.scaleLinear()
  //   .domain(d3.extent(state.filtered, d => d.ideologyScore2020))
  //   .range([0, width])

  xScale = xScale.domain(d3.extent(filteredData, d => d.ideologyScore2020))
  xAxisGroup
    .transition()
    .duration(1000)
    .call(xAxis.scale(xScale))

  // yScale = d3.scaleLinear()
  // .domain(d3.extent(state.filteredData, d => d.envScore2020))
  // .range([height, 0])

  yScale = yScale.domain(d3.extent(filteredData, d => d.envScore2020))
  yAxisGroup
    .transition()
    .duration(1000)
    .call(yAxis.scale(yScale))

  const dots = svg.selectAll("circle.dot")
    .data(filteredData, d => d.BioID)
    .join(
      enter => enter.append("circle")
        .attr("r", radius)
        .attr("cx", d => prevXScale(d.ideologyScore2020))
        .attr("cy", d => prevYScale(d.envScore2020))
        .attr("fill", d => colorScale(d.Party))
        .attr("class", "dot")
        .call(sel => sel.transition().duration(1000)
          .attr("cx", d => xScale(d.ideologyScore2020))
          .attr("cy", d => yScale(d.envScore2020))
        ),
      update => update.call(sel => sel.transition()
        .duration(1000)
        .attr("cx", d => xScale(d.ideologyScore2020))
        .attr("cy", d => yScale(d.envScore2020))), 
      exit => exit.call(exit => exit.transition()
        .duration(1000)
        .attr("cx", d => xScale(d.ideologyScore2020))
        .attr("cy", d => yScale(d.envScore2020))
        .style("opacity", 0)
        .remove()),
    )

}