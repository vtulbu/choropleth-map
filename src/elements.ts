import * as d3 from "d3";

export const svg = d3
  .select("#app")
  .append("svg")
  .attr("width", 960)
  .attr("height", 600);

export const tooltip = d3
  .select("#app")
  .append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip")
  .style("opacity", 0);

export const path = d3.geoPath();

export const x = d3.scaleLinear().domain([2.6, 75.1]).rangeRound([600, 860]);

export const color = d3
  .scaleThreshold<number, string>()
  .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
  .range(d3.schemeGreens[9]);

export const g = svg
  .append("g")
  .attr("class", "key")
  .attr("id", "legend")
  .attr("transform", "translate(0,40)");
