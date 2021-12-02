/* this will show the bar graph comparing number of accessible stops to over all*/





const margin = { top: 20, right: 100, bottom: 40, left: 160 }
const width = 1600 - margin.right - margin.left
const height = 600 - margin.top - margin.bottom;



const svg = d3.select("#container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .style("background-color", "#f1f1f1")
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("../Data/PercentageAccessible.csv", d3.autoType)
  .then(Data => {
    console.log(Data);

});



/*

    const x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

const x1 = d3.scale.ordinal();

const x2 = d3.scale.ordinal();

const y = d3.scale.linear()
    .range([height, 0]);

const xAxis = d3.svg.axis()
    .scale(x0)
    .tickSize(0)
    .orient("bottom");

const yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


    var categoriesNames = data.map(function(d) { return d.categorie; });
    var rateNames = data[0].values.map(function(d) { return d.rate; });
  
    x0.domain(categoriesNames);
    x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);
  

  
    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("x", xScale(0))
      //.attr("y", d => yScale(d.District))
      //.attr("width", d => xScale(d.YTD_Enrollment_Avg))
      .attr("height", yScale.bandwidth())
  }); */