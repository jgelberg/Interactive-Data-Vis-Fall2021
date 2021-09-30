/* CONSTANTS AND GLOBALS */
const width = 800;
const height = 600;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "pink")

    const activities = data.map(d => d.activity)
    // console.log('activities :>> ', activities);

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    const xScale = d3.scaleBand()
      // .domain(["running", "foraging", "chasing", "eating", "climbing"])
      .domain(activities)
      .range([0, width])
      .paddingInner(.2);

    // console.log(d3.extent(data, d => d.count))

    const yScale = d3.scaleLinear()
      // .domain([260, 1500])
      .domain(d3.extent(data, d => d.count))
      // .domain(
      //   [Math.min(), Math.max(data.map(d => d.count))]
      // )
      .range([height, 0])
      .nice()

    // console.log('xScale("running") :>> ', xScale("running"));
    // console.log('xScale("climbing") :>> ', xScale("climbing"));
    // console.log('xScale("eating") :>> ', xScale("eating"));
    

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

    // console.log('xScale.bandwidth() :>> ', xScale.bandwidth());

    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.activity))
      .attr("y", d => yScale(d.count))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d.count))


  })