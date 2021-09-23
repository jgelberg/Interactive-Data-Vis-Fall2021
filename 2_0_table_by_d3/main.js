d3.csv('roster.csv', d3.autoType)
  .then(roster => {
    console.log(roster)

    const filteredData = roster.filter(row => row.Firstname !== null)

    const table = d3.select("#container")
      .append("table")

    const rows = table
      .selectAll(".row")
      .data(filteredData)
      // .data(roster)
      .join("tr")
      .attr("class", "row")
      // .attr("", d => console.log(d))

    const cells = rows
      // .attr("", d => console.log(d)) // { firstname: xxx, lastname: xxx}
      // .attr("", d => console.log(Object.values(d)))
      .selectAll(".cell")
      .data(row => Object.values(row)) // ['xxx', 'xxx']
      .join("td")
      .text(cell => cell)
  })
