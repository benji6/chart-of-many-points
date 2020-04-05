export const DISPLAY_DURATION = 2e3;
export const HEIGHT = innerHeight;
export const POINT_WIDTH = 2.5;
export const WIDTH = innerWidth;

const numPixels = WIDTH * HEIGHT;
const pointsToPixelsRatio = 6e-2;
export const TOTAL_POINTS = Math.round(numPixels * pointsToPixelsRatio);
