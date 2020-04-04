import Regl from "regl";
import * as screenfull from "screenfull";
import layouts from "./layouts";
import { Point } from "./types";
declare let require: any;
const frag = require("./frag.glsl");
const vert = require("./vert.glsl");

const regl = Regl();

const duration = 2e3;
const pointsToPixelsRatio = 6e-2;
const pointWidth = 2.5;

const width = window.innerWidth;
const height = window.innerHeight;

const numPixels = width * height;
const numPoints = Math.round(numPixels * pointsToPixelsRatio);

const points: Point[][] = layouts
  .slice(0, 2)
  .map((layout) => layout(numPoints));

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

const makeDrawPoints = (points: Point[][]) =>
  regl<Uniforms, Attributes, Props>({
    attributes: {
      colorEnd: points[1].map((d) => d.color),
      colorStart: points[0].map((d) => d.color),
      positionEnd: points[1].map((d) => [d.x * width, d.y * height]),
      positionStart: points[0].map((d) => [d.x * width, d.y * height]),
    },
    count: numPoints,
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

let drawPoints = makeDrawPoints(points);
let startTime: number | undefined;
let newLayoutIndex = 1;

regl.frame(({ time }) => {
  if (startTime === undefined) startTime = time;

  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1,
  });

  drawPoints({
    duration,
    pointWidth,
    stageHeight: height,
    stageWidth: width,
    startTime,
  });

  if (time - startTime > duration / 1000) {
    startTime = undefined;
    newLayoutIndex =
      newLayoutIndex === layouts.length - 1 ? 0 : newLayoutIndex + 1;
    points.shift();
    points.push(layouts[newLayoutIndex](numPoints));
    drawPoints = makeDrawPoints(points);
  }
});

document.body.onclick = () => screenfull.isEnabled && screenfull.request();
