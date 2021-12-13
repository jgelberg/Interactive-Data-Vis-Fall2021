// dimensions
const marginOB = { topOB: 120, rightOB: 40, bottomOB: 10, leftOB: 40 }
const widthOB = 1200 /*- margin.right - margin.left*/
const heightOB = 1200;



//specify projection  
const projection = d3.geoMercator()
  .scale(100000)
  .center([-73.94, 40.70])
  //.center([-73.935242, 40.730610])
  .translate([(marginOB.leftOB + widthOB) / 2.1, marginOB.topOB + heightOB / 2.5]);

// path function
const path = d3.geoPath()
  .projection(projection);


// insert data

Promise.all([
  d3.json("../final/Data/borodata.json"),
  d3.csv("../final/Data/SubwayData.csv", d3.autoType),
]).then(([data, subway]) => {
  console.log(data, subway)

  const features = data.features;


  const svgOB = d3.select("#containerOB")
    .append("svg")
    .attr("width", widthOB)
    .attr("height", heightOB);
  svgOB.append("g")
    .attr("transform", `translate(${marginOB.leftOB}, ${marginOB.topOB})`);

  /*
      svg.append('rect')
        .attr('class', 'background')
        .attr('width', width)
        .attr('height', height);
  */

  //const g = svg.append('g');

  /*const mapLayer = g.append('g')
    .classed('map-layer', true);
*/

  const boroCode = data.features.map(d => d.properties.BoroCode)
  const colorScale = d3.scaleOrdinal()
    .domain(boroCode)
    .range(["#f6eff7", "#bdc9e1", "#67a9cf", "#1c9099", "#016c59"]);

  const toolTipOB = d3.select("#containerOB")
    .append("div")
    .style("opacity", 0)
    .style("position", "absolute")
    .attr("id", "tooltipOB")
    .style("background-color", "#fff")
    .attr("width", "500px")
    .attr("height", "50px")
    .style("border", "solid")
    .style("border-width", "1.5px")
    .style("border-radius", "5px")
    .style("padding", "5px")



    toolTipSUB = d3.select("#containerOB")
    .append("div")
    .style("opacity", 0)
    .style("position", "absolute")
    .attr("id", "tooltipSUB")
    .style("background-color", "#fff")
    .attr("width", "50px")
    .attr("height", "50px")
    .style("border", "solid")
    .style("border-width", "1.5px")
    .style("border-radius", "5px")
    .style("padding", "5px")



  const mousemoveOB = function (event, d) {
    //d3.pointer(event)
    toolTipOB
      .html(
        `<div>Borough: <b><i>${d.properties.BoroName}</i></b> </div>
          <div> Population (2019): ${d.properties.Population} </div>
          <div> Median Household Income (2019):  ${d.properties.Median_Household_Income} </div>
          <div> Area (mi<sup>2</sup>): ${d.properties.Area} </div>
          <div> Subway Stops: ${d.properties.Subway_Stops} </div>
          `
      )
      .style("left", `${event.layerX}px-10px`)
      .style("top", `${event.layerY}px`)
      .style("opacity", 1);
  }



  const mouseoverSUB = function (event, d) {
    toolTipSUB
    .html(`
    <div>Stop: ${d.NAME} </div>
    <div> Line(s): ${d.LINE} </div>
    <div>Notes: ${d.ACC_NOTES}  </div>`)
    
    .style("opacity", 1)
    //.style("top", (event.pageY-1000)+"px")
    //.style("left",(event.pageX-800)+"px")
    .style("right", `${event.screenX}px`)
    .style("top", `${event.screenY}px`)
 

    ;

  }

    // Draw each boro as a path
 svgOB.selectAll('path')
    .data(features, d => d.properties.BoroName)
    .enter().append('path')
    .attr('d', path)
    .attr('stroke', 'black')
    .style('stroke-width', '1.5px')
    .style('fill', d => colorScale(d.properties.BoroCode))
    .style('fill-opacity', '1')
    .on("mousemove", mousemoveOB)
    

  svgOB.selectAll("circle")
    .data(subway)
    .enter().append("circle")
   //.attr("id", "circleBasicTooltip")
    .attr("fill", '#fff')
    .attr("r", 3)
    .on("mousemove", mouseoverSUB)

    
    //.attr("cx", function (d) { console.log(projection(d)); return projection(d)[2]; })
    //.attr("cy", function (d) { return projection(d)[1]; })
    .attr("transform", d => {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.LATITUDE, d.LONGITUDE,])
      return `translate(${x}, ${y})`
    })
 
    .on("mouseover", (ev,d) =>
    console.log(ev));

   


});

