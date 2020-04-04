import { Point } from "../types";

export default function gridLayout(length: number): Point[] {
  const pointWidth = (1 / Math.sqrt(length)) * 1.5;
  const pointsPerRow = Math.floor(1 / pointWidth);

  return Array.from({ length }, (_, i) => ({
    color: [
      Math.random() * 0.1,
      Math.random() * 0.6 + 0.4,
      Math.random() * 0.1 + 0.9,
    ],
    x: pointWidth * (i % pointsPerRow),
    y: pointWidth * Math.floor(i / pointsPerRow),
  }));
}
