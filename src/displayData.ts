import { tooltip, svg, path, color } from "./elements";
import type { Education } from "./types";
import type { Topology } from "topojson-specification";
import * as topojson from "topojson-client";

export const displayData = (
  us: Topology | undefined,
  education: Education[] | undefined
) => {
  if (!us || !education) {
    return;
  }
  svg
    .append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(
      topojson.feature(
        us,
        us.objects.counties as GeoJSON.GeometryCollection<any>
      ).features
    )
    .enter()
    .append("path")
    .attr("class", "county")
    .attr("data-fips", function (d) {
      return d.id || 0;
    })
    .attr("data-education", function (d) {
      var result = education.filter(function (obj) {
        return obj.fips === d.id;
      });
      if (result[0]) {
        return result[0].bachelorsOrHigher;
      }
      console.log("could find data for: ", d.id);
      return 0;
    })
    .attr("fill", function (d) {
      var result = education.filter(function (obj) {
        return obj.fips === d.id;
      });
      if (result[0]) {
        return color(result[0].bachelorsOrHigher);
      }
      return color(0);
    })
    .attr("d", path)
    .on("mouseover", function (event, d) {
      tooltip.style("opacity", 0.9);
      tooltip
        .html(function () {
          var result = education.filter(function (obj) {
            return obj.fips === d.id;
          });
          if (result[0]) {
            return (
              result[0]["area_name"] +
              ", " +
              result[0]["state"] +
              ": " +
              result[0].bachelorsOrHigher +
              "%"
            );
          }
          return "0";
        })
        .attr("data-education", function () {
          var result = education.filter(function (obj) {
            return obj.fips === d.id;
          });
          if (result[0]) {
            return result[0].bachelorsOrHigher;
          }
          return 0;
        })
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function () {
      tooltip.style("opacity", 0);
    });

  svg
    .append("path")
    .datum(
      topojson.mesh(
        us,
        us.objects.states as GeoJSON.GeometryCollection<any>,

        function (a, b) {
          return a !== b;
        }
      )
    )
    .attr("class", "states")
    .attr("d", path);
};
