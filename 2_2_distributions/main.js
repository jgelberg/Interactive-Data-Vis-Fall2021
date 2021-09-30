/* CONSTANTS AND GLOBALS */
const width = 600,
  height = 600,
  margin = 40,
  radius = 5;

/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType)
  .then(scores => {
    console.log(scores)

    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      // .style("background-color", "pink")

    /* SCALES */

    const xScale = d3.scaleLinear()
      .domain(d3.extent(scores, d => d.ideologyScore2020))
      .range([margin, width - margin])
      .nice()

    const yScale = d3.scaleLinear()
      .domain(d3.extent(scores, d => d.envScore2020))
      .range([height - margin, margin])
      .nice()

    console.log('yScale.domain() :>> ', yScale.domain());

    const colorScale = d3.scaleOrdinal()
      .domain(["R", "D", "I"])
      .range(["red", "blue", "purple"])
    
    /* HTML ELEMENTS */

    svg.selectAll(".dot")
      .data(scores)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.ideologyScore2020))
      .attr("cy", d => yScale(d.envScore2020))
      .attr("r", radius)
      .style("fill", d => colorScale(d.Party))

    svg.append("g")
      .attr("class", "x-axis")
      .style("transform", `translate(0px,${height - margin}px)`)
      .call(d3.axisBottom(xScale))

    svg.append("g")
      .attr("class", "y-axis")
      .style("transform", `translate(${margin}px,0px)`)
      .call(d3.axisLeft(yScale))
    
  });
