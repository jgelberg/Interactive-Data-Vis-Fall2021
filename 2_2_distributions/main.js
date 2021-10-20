/* CONSTANTS AND GLOBALS */
const width = 1000,
height = 1100,
margin = 50 ,
radius = 5;

/* LOAD DATA */
d3.csv("../data/SAT__College_Board__2010_School_Level_Results.csv", d3.autoType)
  .then(data => {
    console.log(data)

const svg = d3.select("#container")
    .append("svg")
    .attr("width",width)
    .attr("height", height)
    //.attr("padding", 1000)
    .style("background-color", "#f1f1f1")


const title = d3.select("#title")
.append("svg")
  .attr("width", width + margin)
  .attr("height", height + margin)
.append("g")
  .attr("transform",
        "translate(" + margin + "," + margin + ")")


    /* SCALES */

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d=>d.CriticalReadingMean))
    .range([margin,width - margin])
    .nice()

  const yScale = d3.scaleLinear()
  .domain(d3.extent(data, d=>d.MathematicsMean))
  .range([height ,margin])


  const colorScale = d3.scaleOrdinal()
  .domain(d3.extent(data, d=>d.Borough))
  .range(["red", "orange", "yellow", "green", "blue"])


    
    /* HTML ELEMENTS */


    svg.append("g")
    .attr("class", "x-axis")
    .call(d3.axisBottom(xScale)
    .ticks(10))
    .style("transform", `translate(0px,${height-margin}px)`)

    svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale)
    .ticks(10))
    .style("transform", `translate(${margin}px,0px)`)
   

    // x axis title
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width - 30)
    .attr("y", height - 10)
    .text("Critical Reading Mean")

    // y axis title
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", margin - 30)
    .attr("x", -margin)
    .text("Mathematics Mean")




  svg.selectAll(".dot")
          .data(data)
          .join("circle")
          .attr("class", "dot")
          .attr("cx", d => xScale(d.CriticalReadingMean))
          .attr("cy", d => yScale(d.MathematicsMean))
          .attr("r",radius)
          .style("fill", d=>colorScale(d.Borough))
          .on('mouseover', function(d, i) {
            console.log("mouse over", this);
            // transition the mouse overed element
            d3.select(this)
              .transition()
              .duration(5)
              .attr('r', 20)
        
              
                	;
          })
          .on('mouseout', function(d, i) {
            console.log("mouseout", this);
            // return the mouseover'd element
            d3.select(this)
              .transition()
              .duration(100)
              .attr('r', radius);
            })


  });
