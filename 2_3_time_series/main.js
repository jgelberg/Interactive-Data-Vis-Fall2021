
 
 
 /* CONSTANTS AND GLOBALS */
const 
margin = {top: 10, right: 30, bottom: 30, left: 50}
width = 1600 - margin.left - margin.right,
height = 800 - margin.top - margin.bottom
radius = 3;



/* LOAD DATA */
d3.csv('../data/MoviesByReleaseYearNetflix.csv', d =>

{
  return {
  Year: d3.timeParse("%Y")(d.YearReleased),
  Count: +d.Count}
}).then(data => {
  console.log('data :>> ', data);



  // CREATE SVG ELEMENT
  const svg = d3.select("#container")
    .append("svg")
    .attr("width",width + margin.left + margin.right )
    .attr("height", height + margin.top + margin.bottom)
    .style("background-color", "#f1f1f1")
      .append("g")
      .attr("transform",`translate(${margin.left},${margin.top})`)
   ;

    // SCALES
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.Year))
      .range([ 0, width ])
      .nice();

    const yScale = d3.scaleLinear()
      .domain( d3.extent(data, d => +d.Count))
      .range([ height, 0 ])
      ;
    // BUILD AND CALL AXES

    svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,  ${height})`)
    .call(d3.axisBottom(xScale)
      .ticks(20))
    ;

    svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale)
    )
  
    .style("transform", `translate(${margin}px,-50px)`);
  

  // LINE GENERATOR FUNCTION

  // DRAW LINE

  svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "#E50914")
  .attr("stroke-width", 4)
  .attr("d", d3.line()
    .x(function(d) { return xScale(d.Year) })
    .y(function(d) { return yScale(d.Count) })
    )


    svg.append("path")
    .datum(data)
    .attr("fill", "#E50914")
    .attr("fill-opacity", .3)
    .attr("stroke", "none")
    .attr("d", d3.area()
      .x(d => xScale(d.Year))
      .y0( height )
      .y1(d => yScale(d.Count))
      )

      svg.selectAll("dot")
      .data(data)
      .join("circle")
      .attr("class", "dot")
      .attr("fill", "black")
      .attr("cx", d => xScale(d.Year))
      .attr("cy", d => yScale(d.Count))
      .attr("r", radius)
          

});