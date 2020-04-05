import * as screenfull from "screenfull";
import layouts from "./layouts";
import { Point } from "./types";
import { regl, state } from "./globals";
import {
  DISPLAY_DURATION,
  HEIGHT,
  POINT_WIDTH,
  TOTAL_POINTS,
  WIDTH,
} from "./constants";
import makeDrawPoints from "./makeDrawPoints";
import lineChart from "./layouts/lineChart";

const demoPoints: Point[][] = layouts
  .slice(0, 2)
  .map((layout) => layout(TOTAL_POINTS));

const interactivePoints: Point[][] = [
  state.chartParams0,
  state.chartParams1,
].map((params) => lineChart(params)(TOTAL_POINTS));

let drawPoints = state.isDemoMode
  ? makeDrawPoints(demoPoints)
  : makeDrawPoints(interactivePoints);
let startTime: number | undefined;
let newLayoutIndex = 1;

regl.frame(({ time }) => {
  if (startTime === undefined) startTime = time;

  regl.clear({ color: [0, 0, 0, 1], depth: 1 });

  drawPoints({
    duration: DISPLAY_DURATION,
    pointWidth: POINT_WIDTH,
    stageHeight: HEIGHT,
    stageWidth: WIDTH,
    startTime,
  });

  if (!state.isDemoMode) return;

  if (time - startTime > DISPLAY_DURATION / 1000) {
    startTime = undefined;
    newLayoutIndex =
      newLayoutIndex === layouts.length - 1 ? 0 : newLayoutIndex + 1;
    demoPoints.shift();
    demoPoints.push(layouts[newLayoutIndex](TOTAL_POINTS));
    drawPoints = makeDrawPoints(demoPoints);
  }
});

document.body.onclick = () => screenfull.isEnabled && screenfull.request();
