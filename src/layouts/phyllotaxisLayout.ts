import { Point } from "../types";
import { randomColorFn } from "./_utils";

export default function phyllotaxisLayout(length: number): Point[] {
  const pointWidth = 1 / Math.sqrt(length);
  const theta = Math.PI * (3 - Math.sqrt(5));
  const pointRadius = pointWidth / 2;
  const colorFn = randomColorFn();

  return Array.from({ length }, (_, i) => {
    const index = i % length;
    const phylloX = pointRadius * Math.sqrt(index) * Math.cos(index * theta);
    const phylloY = pointRadius * Math.sqrt(index) * Math.sin(index * theta);
    return {
      color: colorFn(length, i),
      x: 0.5 + (phylloX - pointRadius),
      y: 0.5 + (phylloY - pointRadius),
    };
  });
}
