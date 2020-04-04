import { rgb } from "d3-color";
import { scaleLinear, scaleSequential } from "d3-scale";
import {
  interpolateCool,
  interpolateInferno,
  interpolateViridis,
} from "d3-scale-chromatic";
import { Point } from "./types";

const { random } = Math;

type Color = [number, number, number];

const colors = [interpolateViridis, interpolateInferno, interpolateCool]
  .map((f) => (length: number, i: number): Color => {
    const { r, g, b } = rgb(scaleSequential(f).domain([length - 1, 0])(i));
    return [r, g, b].map((x) => x / 255) as Color;
  })
  .concat(
    [
      [1, 0, 0] as Color,
      [0, 1, 0] as Color,
      [0, 0, 1] as Color,
    ].map((color) => () => color)
  );

const randomColorFn = () => colors[Math.floor(random() * colors.length)];

const trigonometricLayout = (fn: (x: number) => number) => (
  length: number
): Point[] => {
  const amplitude = 0.25;
  const periods = 3;
  const yScale = scaleLinear()
    .domain([0, length - 1])
    .range([0, periods * 2 * Math.PI]);
  const colorFn = randomColorFn();

  return Array.from({ length }, (_, i) => ({
    color: colorFn(length, i),
    x: (i / length) * (1 - 0.01),
    y: amplitude * fn(yScale(i)) + 0.5,
  }));
};

const columnChartLayout = (length: number): Point[] => {
  const columnChartData = Array.from(
    { length: 4 + Math.floor(random() * 128) },
    () => random()
  );
  const dataLength = columnChartData.length;
  const barWidth = 1 / dataLength;
  const colorFn = randomColorFn();
  const totalYs = columnChartData.reduce((a, b) => a + b, 0);

  return columnChartData
    .map((y, i) =>
      Array.from({ length: Math.ceil((length * y) / totalYs) }, () => ({
        color: colorFn(dataLength, i),
        x: barWidth * (i + random()),
        y: 1 - y * random(),
      }))
    )
    .reduce((xs, ys) => [...xs, ...ys], []);
};

const phyllotaxisLayout = (length: number): Point[] => {
  const pointWidth = 1 / Math.sqrt(length);
  const theta = Math.PI * (3 - Math.sqrt(5));
  const pointRadius = pointWidth / 2;

  return Array.from({ length }, (_, i) => {
    const index = i % length;
    const phylloX = pointRadius * Math.sqrt(index) * Math.cos(index * theta);
    const phylloY = pointRadius * Math.sqrt(index) * Math.sin(index * theta);
    return {
      color: colors[0](length, i),
      x: 0.5 + (phylloX - pointRadius),
      y: 0.5 + (phylloY - pointRadius),
    };
  });
};

const gridLayout = (length: number): Point[] => {
  const pointWidth = (1 / Math.sqrt(length)) * 1.5;
  const pointsPerRow = Math.floor(1 / pointWidth);

  return Array.from({ length }, (_, i) => ({
    color: [random() * 0.1, random() * 0.6 + 0.4, random() * 0.1 + 0.9],
    x: pointWidth * (i % pointsPerRow),
    y: pointWidth * Math.floor(i / pointsPerRow),
  }));
};

const cosLayout = trigonometricLayout(Math.cos);
const sinLayout = trigonometricLayout(Math.sin);
const tanLayout = trigonometricLayout(Math.tan);

const randomLayout = (length: number): Point[] => {
  const colorFn = randomColorFn();
  return Array.from({ length }, (_, i) => ({
    color: colorFn(length, i),
    x: random(),
    y: random(),
  }));
};

const spiralLayout = (length: number): Point[] => {
  const periods = 11;

  const rScale = scaleLinear()
    .domain([0, length - 1])
    .range([0, Math.min(0.5, 0.5)]);

  const thetaScale = scaleLinear()
    .domain([0, length - 1])
    .range([0, periods * 2 * Math.PI]);

  return Array.from({ length }, (_, i) => ({
    color: colors[2](length, i),
    x: rScale(i) * Math.cos(thetaScale(i)) + 0.5,
    y: rScale(i) * Math.sin(thetaScale(i)) + 0.5,
  }));
};

export default [
  columnChartLayout,
  columnChartLayout,
  columnChartLayout,
  randomLayout,
  columnChartLayout,
  phyllotaxisLayout,
  sinLayout,
  spiralLayout,
  tanLayout,
  gridLayout,
  columnChartLayout,
  cosLayout,
];
