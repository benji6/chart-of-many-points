import { scaleLinear } from "d3-scale";
import { Point } from "../types";
import { randomColorFn } from "./_utils";

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

export const cosLayout = trigonometricLayout(Math.cos);
export const sinLayout = trigonometricLayout(Math.sin);
export const tanLayout = trigonometricLayout(Math.tan);
