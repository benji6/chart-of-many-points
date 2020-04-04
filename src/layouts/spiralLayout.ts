import { scaleLinear } from "d3-scale";
import { Point } from "../types";
import { randomColorFn } from "./_utils";

export default function spiralLayout(length: number): Point[] {
  const periods = 11;
  const colorFn = randomColorFn();

  const rScale = scaleLinear()
    .domain([0, length - 1])
    .range([0, Math.min(0.5, 0.5)]);

  const thetaScale = scaleLinear()
    .domain([0, length - 1])
    .range([0, periods * 2 * Math.PI]);

  return Array.from({ length }, (_, i) => ({
    color: colorFn(length, i),
    x: rScale(i) * Math.cos(thetaScale(i)) + 0.5,
    y: rScale(i) * Math.sin(thetaScale(i)) + 0.5,
  }));
}
