import { Point } from "../types";
import { randomColorFn } from "./_utils";

export default function columnChartLayout(length: number): Point[] {
  const columnChartData = Array.from(
    { length: 4 + Math.floor(Math.random() * 128) },
    () => Math.random()
  );
  const dataLength = columnChartData.length;
  const barWidth = 1 / dataLength;
  const colorFn = randomColorFn();
  const totalYs = columnChartData.reduce((a, b) => a + b, 0);

  return columnChartData
    .map((y, i) =>
      Array.from({ length: Math.ceil((length * y) / totalYs) }, () => ({
        color: colorFn(dataLength, i),
        x: barWidth * (i + Math.random()),
        y: 1 - y * Math.random(),
      }))
    )
    .reduce((xs, ys) => [...xs, ...ys], []);
}
