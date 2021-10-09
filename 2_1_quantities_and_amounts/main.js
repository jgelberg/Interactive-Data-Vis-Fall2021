/* https://data.cityofnewyork.us/Education/2010-2011-School-Attendance-and-Enrollment-Statist/7z8d-msnt*/


/* CONSTANTS AND GLOBALS */

const margin = {top: 20, right: 300, bottom: 20, left: 50}
const width = 1600 - margin.right
const height = 600 - margin.top - margin.bottom;

/* LOAD DATA */

const svg = d3.select("#container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .style("background-color", "white")


d3.csv("../data/2010_-_2011_Enrollement_by_District.csv", d3.autoType)
.then(data => {
  console.log(data);


//const YTD_Enrollment_Avg = data.map(d => d.YTD_Enrollment_Avg)
  // console.log('YTD_Enrollment_Avg :>> ', YTD_Enrollment_Avg);

    /*SCALES */
    /** This is where you should define your scales from data to pixel space */
    const xScale = d3.scaleLinear()
    .domain([0, 65000])
    .range([0, width])
      svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")

    const yScale = d3.scaleBand()
    .domain(data.map(d => d.District))
    .range([ 0, height])
    .padding(.1);
    svg.append("g")
      .call(d3.axisLeft(yScale))

    

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

    svg.selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("x", xScale(0))
    .attr("y", d => yScale(d.District))
    .attr("width", d => xScale(d.YTD_Enrollment_Avg))
    .attr("height", yScale.bandwidth())
    .attr("fill", "yellowGreen")
  




  });