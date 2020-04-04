import { Point } from "../types";
import { randomColorFn } from "./_utils";

export default function randomLayout(length: number): Point[] {
  const colorFn = randomColorFn();
  return Array.from({ length }, (_, i) => ({
    color: colorFn(length, i),
    x: Math.random(),
    y: Math.random(),
  }));
}
