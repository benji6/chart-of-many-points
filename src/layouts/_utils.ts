import { rgb } from "d3-color";
import { scaleSequential } from "d3-scale";
import {
  interpolateCool,
  interpolateInferno,
  interpolateViridis,
} from "d3-scale-chromatic";
import { Color } from "../types";

const colors = [
  ...[
    interpolateCool,
    interpolateCool,
    interpolateInferno,
    interpolateInferno,
    interpolateViridis,
    interpolateViridis,
  ].map((f) => (length: number, i: number): Color => {
    const { r, g, b } = rgb(scaleSequential(f).domain([length - 1, 0])(i));
    return [r, g, b].map((x) => x / 255) as Color;
  }),
  () => [1, 0, 0] as Color,
  () => [0, 1, 0] as Color,
  () => [0, 0, 1] as Color,
];

export const randomColorFn = () =>
  colors[Math.floor(Math.random() * colors.length)];
