import { Point } from "../types";
import { TOTAL_POINTS } from "../constants";
import { randomColorFn } from "./_utils";

export default ({
  domain: [minX, maxX],
  f,
  range: [minY, maxY],
}: {
  domain: readonly [number, number];
  f: (x: number) => number;
  range: readonly [number, number];
}) =>
  function lineChart(length: number): Point[] {
    const xLength = maxX - minX;
    const yLength = maxY - minY;
    const deltaX = xLength / TOTAL_POINTS;
    const colorFn = randomColorFn();

    return Array.from({ length }, (_, i) => {
      const x = minX + deltaX * i;
      const y = f(x) - minY;
      return {
        color: colorFn(length, i),
        x: x / xLength,
        y: y / yLength,
      };
    });
  };
