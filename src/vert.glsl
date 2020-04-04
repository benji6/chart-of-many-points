varying vec3 fragColor;

attribute vec2 positionEnd;
attribute vec2 positionStart;
attribute vec3 colorEnd;
attribute vec3 colorStart;

uniform float duration;
uniform float elapsed;
uniform float pointWidth;
uniform float stageHeight;
uniform float stageWidth;

float easeCubicInOut(float t) {
  t *= 2.;
  t = (t <= 1. ? t * t * t : (t -= 2.) * t * t + 2.) / 2.;

  return t > 1. ? 1. : t;
}

vec2 normalizeCoords(vec2 position) {
  return vec2(
    2. * (position.x / stageWidth - .5),
    2. * (position.y / stageHeight - .5)
  );
}

void main() {
  float t = easeCubicInOut(elapsed / duration);
  gl_PointSize = pointWidth;
  fragColor = mix(colorStart, colorEnd, t);
  vec2 position = mix(positionStart, positionEnd, t);
  gl_Position = vec4(normalizeCoords(position), 0., 1.);
}
