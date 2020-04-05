import { Point } from "../types";
import { TOTAL_POINTS } from "../constants";
import { randomColorFn } from "./_utils";

export interface LineChartParams {
  domain: [number, number];
  f(x: number): number;
  range: [number, number];
}

export default ({
  domain: [minX, maxX],
  f,
  range: [minY, maxY],
}: LineChartParams) =>
  function lineChart(length: number): Point[] {
    const xLength = maxX - minX;
    const yLength = maxY - minY;
    const deltaX = xLength / TOTAL_POINTS;
    const colorFn = randomColorFn();

    return Array.from({ length }, (_, i) => {
      const x = minX + deltaX * i;
      const y = f(x);
      return {
        color: colorFn(length, i),
        x: (x - minX) / xLength,
        y: (y - minY) / yLength,
      };
    });
  };
