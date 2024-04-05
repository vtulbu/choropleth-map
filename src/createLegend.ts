import * as d3 from "d3";
import { g, color, x } from "./elements";

export const createLegend = () => {
  g.selectAll("rect")
    .data(
      color.range().map(function (d) {
        const res = color.invertExtent(d);

        if (res[0] === null) {
          res[0] = x.domain()[0];
        }
        if (d[1] === null) {
          res[1] = x.domain()[1];
        }
        return res;
      })
    )
    .enter()
    .append("rect")
    .attr("height", 8)
    .attr("x", function (d) {
      return x(d[0] || 0);
    })
    .attr("width", function (d) {
      return d[0] && d[1] ? x(d[1]) - x(d[0]) : 0;
    })
    .attr("fill", function (d) {
      return color(d[0] || 0);
    });

  g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold");

  g.call(
    d3
      .axisBottom(x)
      .tickSize(13)
      .tickFormat(function (x) {
        return Math.round(Number(x)) + "%";
      })
      .tickValues(color.domain())
  )
    .select(".domain")
    .remove();
};
