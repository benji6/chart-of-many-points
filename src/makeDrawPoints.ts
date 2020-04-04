import Regl from "regl";
import { Point } from "./types";
import { regl } from "./globals";
import { TOTAL_POINTS, HEIGHT, WIDTH } from "./constants";
declare let require: any;
const frag = require("./frag.glsl");
const vert = require("./vert.glsl");

interface Attributes {
  colorEnd: Regl.Vec3[];
  colorStart: Regl.Vec3[];
  positionEnd: Regl.Vec2[];
  positionStart: Regl.Vec2[];
}

interface Uniforms {
  duration: Regl.Uniform;
  elapsed: Regl.Uniform;
  pointWidth: Regl.Uniform;
  stageHeight: Regl.Uniform;
  stageWidth: Regl.Uniform;
}

interface Props extends Uniforms {
  startTime: number;
}

export default function makeDrawPoints(points: Point[][]) {
  return regl<Uniforms, Attributes, Props>({
    attributes: {
      colorEnd: points[1].map((d) => d.color),
      colorStart: points[0].map((d) => d.color),
      positionEnd: points[1].map((d) => [d.x * WIDTH, d.y * HEIGHT]),
      positionStart: points[0].map((d) => [d.x * WIDTH, d.y * HEIGHT]),
    },
    count: TOTAL_POINTS,
    frag,
    primitive: "points",
    uniforms: {
      duration: regl.prop<Uniforms, "duration">("duration"),
      elapsed: ({ time }, { startTime = 0 }) => (time - startTime) * 1000,
      pointWidth: regl.prop<Uniforms, "pointWidth">("pointWidth"),
      stageHeight: regl.prop<Uniforms, "stageHeight">("stageHeight"),
      stageWidth: regl.prop<Uniforms, "stageWidth">("stageWidth"),
    },
    vert,
  });
}
