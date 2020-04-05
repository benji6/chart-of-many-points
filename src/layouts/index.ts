import columnChartLayout from "./columnChartLayout";
import randomLayout from "./randomLayout";
import spiralLayout from "./spiralLayout";
import phyllotaxisLayout from "./phyllotaxisLayout";
import gridLayout from "./gridLayout";
import lineChart from "./lineChart";

const trigonometricLineChart = (f: (x: number) => number) =>
  lineChart({ domain: [0, Math.PI * 6], f, range: [-2, 2] });

const cosLayout = trigonometricLineChart(Math.cos);
const sinLayout = trigonometricLineChart(Math.sin);
const tanLayout = trigonometricLineChart(Math.tan);

export default [
  columnChartLayout,
  columnChartLayout,
  randomLayout,
  columnChartLayout,
  phyllotaxisLayout,
  sinLayout,
  spiralLayout,
  tanLayout,
  lineChart({ domain: [0, 1], f: Math.random, range: [0, 1] }),
  cosLayout,
  gridLayout,
  columnChartLayout,
];
