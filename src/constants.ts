export const HEIGHT = innerHeight;
export const WIDTH = innerWidth;

const numPixels = WIDTH * HEIGHT;
const pointsToPixelsRatio = 6e-2;

export const TOTAL_POINTS = Math.round(numPixels * pointsToPixelsRatio);
