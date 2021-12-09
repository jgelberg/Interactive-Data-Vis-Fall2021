/* this will show the bar graph comparing number of accessible stops to over all*/


const margin = { top: 20, right: 100, bottom: 40, left: 50 }
const width = 1000 - margin.right - margin.left
const height = 300 - margin.top - margin.bottom;


const svg = d3.selectAll("#container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .style("background-color", "#f9f7f1")
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)


d3.csv("../final/Data/PercentageAccessible.csv", d3.autoType)
.then(data => {
  console.log(data);

 // List of subgroups = header of the csv files 
 const subgroups = data.columns.slice(1)
 console.log(subgroups)
   // List of Lines 
   const lineGroup = data.map(d => d.Line)

  // const Total = data.map(d => d.Total)



const xScale = d3.scaleBand()
    .domain(lineGroup)
    .range([0, width])
    .paddingInner(.2);
svg.append("g")
.attr("transform", `translate(0, ${height})`)
.call(d3.axisBottom(xScale))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end")


const yScale = d3.scaleLinear()
.domain([0,120])
.range([height, 0])
svg.append("g")
.call(d3.axisLeft(yScale));


const xSubgroup = d3.scaleBand()
.domain(subgroups)
.range([0, xScale.bandwidth()])
.padding([0.05])


const colorGroup = d3.scaleOrdinal()
.domain(subgroups)
.range(['#000','#4daf4a','#aaa'/*red*/,'#377eb8'])

/*const colorTotal = d3.scaleOrdinal()
.domain(Total)*/
//.range('#0039A6'/*blue*/, '#FF6319'/*orange*/,'#FCCC0A' /*yellow*/,'#996633'/*brown*/,
//'#EEE352E' /*red */, '#00933C'/*green*/,'#B933AD'/*purple*/,'#6CBE45' /*lgreen*/, 
//'#A7A9AC' /*lgray*/,'#808183'/*dgray*/)
/*var toolTip = d3.select("#container")
      .append("div")
      .style("opacity", 0)
      .style("position", "absolute")
      .attr("class", "tooltip")
      .style("background-color", "#fff")
      .attr("width", "500px")
      .attr("height", "50px")
      .style("border", "solid")
      .style("border-width", "1.5px")
      .style("border-radius", "5px")
      .style("padding", "5px")



  const mousemove = function (event, d) {
    toolTip
      .html(
        `<div>Total: </div>`
      )
      
      .style("left", `${event.layerX}px`)
      .style("display","inline-block")
      .style("top", `${event.layerY}px`)
      .style("opacity", 1)
   

  }

*/
/* add console log ^^ 
go to appended tool tip within the svg
if it's not updating - your not grapping the right thing, but if it is, display is off

*/



svg.append("g")

.selectAll(".bar")
.data(data)
.join("g")
.attr("transform", d => `translate(${xScale(d.Line)}, 0)`)
.selectAll("rect")
.data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
.join("rect")
  .attr("x", d => xSubgroup(d.key))
  .attr("y", d => yScale(d.value))
  .attr("width", xSubgroup.bandwidth())
  .attr("height", d => height - yScale(d.value))
  //attr("fill",d => colorTotal(d ))
  .attr("fill", d => colorGroup(d.key) )
  //.attr("mousemove",mousemove)


  .on("mouseover", (ev,d) =>
  console.log(ev));
    // log the mouse x,y position

});










;
