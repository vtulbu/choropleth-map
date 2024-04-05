import "./style.css";

import * as d3 from "d3";
import { Education } from "./types";
import { Topology } from "topojson-specification";
import { displayData } from "./displayData";
import { createLegend } from "./createLegend";

Promise.all([
  d3.json<Topology>(
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
  ),
  d3.json<Education[]>(
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"
  ),
])
  .then((data) => (createLegend(), displayData(data[0], data[1])))
  .catch((err) => console.error(err));
